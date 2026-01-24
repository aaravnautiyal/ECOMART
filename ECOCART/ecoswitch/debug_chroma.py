# File: debug_chroma.py

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.fake import FakeEmbeddings # We use a fake embedder to remove Ollama from this test
from langchain_core.documents import Document

DB_DIR = "./chroma_debug_test"

print("--- STARTING CHROMA DEBUG TEST ---")

try:
    # 1. Create a brand new, empty vector store
    print(f"1. Creating a new vector store in '{DB_DIR}'...")
    vectorstore = Chroma(
        embedding_function=FakeEmbeddings(size=384), # Using a fake embedder for speed and isolation
        persist_directory=DB_DIR
    )

    # 2. Add ONE document with a specific ID
    test_id = "my_special_id"
    doc_to_add = Document(page_content="This is a test document.", metadata={"source": "debug_script"})
    print(f"2. Adding a document with the explicit ID: '{test_id}'")
    vectorstore.add_documents(documents=[doc_to_add], ids=[test_id])

    # 3. Immediately try to retrieve that same document by its ID
    print(f"3. Attempting to retrieve the document with ID: '{test_id}'...")
    retrieved_doc = vectorstore.get(ids=[test_id])

    # 4. Check the result
    print("4. Checking the retrieval result...")
    if retrieved_doc and retrieved_doc.get('ids') and retrieved_doc['ids'][0] == test_id:
        print("\n✅ SUCCESS: ChromaDB successfully saved and retrieved the document by its ID.")
        print("Retrieved data:", retrieved_doc)
    else:
        print("\n❌ FAILURE: ChromaDB did NOT retrieve the document it just saved.")
        print("This indicates a problem with ChromaDB's ability to persist and read data on your system.")
        print("Raw retrieval result was:", retrieved_doc)

except Exception as e:
    print(f"\n💥 An exception occurred during the test: {e}")

finally:
    # Clean up the test directory
    import shutil
    print("\n5. Cleaning up the test directory...")
    try:
        shutil.rmtree(DB_DIR)
        print("Cleanup complete.")
    except FileNotFoundError:
        print("Test directory was not created, nothing to clean.")
    
    print("--- DEBUG TEST FINISHED ---")