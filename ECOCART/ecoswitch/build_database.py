

import pandas as pd
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
import shutil
import os
import sys


DATA_FILE = "large_product_catalog.json"  
DB_DIR = "./chroma_db_products"
EMBEDDING_MODEL_NAME = "nomic-embed-text"
ID_COLUMN = "id"
TEXT_COLUMNS = ['name', 'description', 'category']

def build():
    print("--- STARTING DATABASE BUILD SCRIPT ---")

    if os.path.exists(DB_DIR):
        print(f"Found old database. Deleting '{DB_DIR}' for a fresh build...")
        shutil.rmtree(DB_DIR)
    
    if not os.path.exists(DATA_FILE):
        print(f"FATAL ERROR: Data file '{DATA_FILE}' not found.")
        sys.exit(1)
        
    print(f"Loading data from '{DATA_FILE}'...")
    df = pd.read_json(DATA_FILE)

    print(f"Preparing {len(df)} documents for indexing...")
    documents = []
    ids = []
    for _, row in df.iterrows():
        text_to_embed = " ".join([f"{col}: {row[col]}" for col in TEXT_COLUMNS if pd.notna(row[col])])
        
       
        metadata = {
            "id": int(row.get("id", 0)),
            "name": str(row.get("name", "")),
            "description": str(row.get("description", "")),
            "category": str(row.get("category", "")),
            "ecoscore": float(row.get("ecoscore", 0.0))
        }
        
        doc = Document(page_content=text_to_embed, metadata=metadata)
        documents.append(doc)
        
        ids.append(str(row[ID_COLUMN]))

    print(f"Initializing Ollama embedding model ('{EMBEDDING_MODEL_NAME}')...")
    embeddings = OllamaEmbeddings(model=EMBEDDING_MODEL_NAME)

    print(f"Creating new vector store in '{DB_DIR}'...")
    Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        ids=ids,
        persist_directory=DB_DIR,
    )

    print("\n✅ SUCCESS: Database build complete.")
    print("--- SCRIPT FINISHED ---")

if __name__ == "__main__":
    build()