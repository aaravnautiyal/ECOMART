

import os
import sys
from flask import Flask, jsonify, abort, request
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma


CHROMA_DB_DIRECTORY = "./chroma_db_products"
EMBEDDING_MODEL_NAME = "nomic-embed-text"

# --- Initialization ---
app = Flask(__name__)
CORS(app)

if not os.path.exists(CHROMA_DB_DIRECTORY):
    print(f"FATAL ERROR: ChromaDB directory '{CHROMA_DB_DIRECTORY}' not found.")
    print("Please run the `build_database.py` script first.")
    sys.exit(1)

print("Loading embedding model...")
embeddings = OllamaEmbeddings(model=EMBEDDING_MODEL_NAME)

print(f"Loading persistent vector store from: {CHROMA_DB_DIRECTORY}")
vectorstore = Chroma(
    persist_directory=CHROMA_DB_DIRECTORY, 
    embedding_function=embeddings
)
print("✅ AI Service is ready and running.")

# === Recommendation Endpoint ===
@app.route('/api/v1/products/<int:product_id>/eco-alternatives', methods=['GET'])
def get_eco_alternatives(product_id):
    try:
        
        current_product_data = vectorstore.get(ids=[str(product_id)], include=["metadatas"])
        
        if not current_product_data or not current_product_data.get('metadatas'):
            abort(404, description=f"Product with ID '{product_id}' not found in the knowledge base.")

        
        current_product = current_product_data['metadatas'][0]
        current_ecoscore = float(current_product.get('ecoscore', 0.0))
        
       
        search_text = " ".join([f"{k}: {v}" for k, v in current_product.items() if k in ['name', 'description', 'category']])
        
       
        
        similar_docs = vectorstore.similarity_search(search_text, k=30)
        
        
        alternatives = []
        for doc in similar_docs:
            
            if doc.metadata.get('id') == product_id:
                continue
            
            
            is_better_eco = float(doc.metadata.get('ecoscore', 0.0)) > current_ecoscore
            
            if is_better_eco:
                
                alternatives.append(doc.metadata)
            
            
            if len(alternatives) >= 3:
                break
                
        if not alternatives:
            abort(404, description="No suitable eco-alternatives found with a better ecoscore.")

        return jsonify(alternatives)

    except HTTPException as e:
        return e
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

# The ingest endpoint is kept for future use with n8n.
@app.route('/api/v1/products/ingest', methods=['POST'])
def ingest_product():
    from langchain_core.documents import Document
    product_data = request.json
    if not product_data or 'id' not in product_data:
        return jsonify({"status": "error", "message": "Product 'id' is required."}), 400
    product_id = str(product_data.get('id'))
    text_to_embed = " ".join([f"{k}: {product_data.get(k, '')}" for k in ['name', 'description', 'category']])
    doc = Document(page_content=text_to_embed, metadata=product_data)
    vectorstore.add_documents(documents=[doc], ids=[product_id])
    print(f"Successfully ingested/updated product ID: {product_id}")
    return jsonify({"status": "success", "message": f"Product {product_id} ingested."}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)