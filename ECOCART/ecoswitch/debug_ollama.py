# File: debug_ollama.py

from langchain_community.embeddings import OllamaEmbeddings

print("--- STARTING OLLAMA CONNECTION TEST ---")

try:
    
    print("1. Initializing OllamaEmbeddings with model 'nomic-embed-text'...")
    
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    print("   Initialization successful.")

    test_sentence = "This is a test."
    print(f"2. Attempting to embed the sentence: '{test_sentence}'...")
    vector = embeddings.embed_query(test_sentence)

    
    if vector and isinstance(vector, list) and len(vector) > 0:
        print("\n✅ SUCCESS: Successfully connected to Ollama and generated an embedding.")
        print(f"   The generated vector has {len(vector)} dimensions.")
    else:
        print("\n❌ FAILURE: Connection to Ollama seemed to work, but no valid embedding was returned.")
        print("   Raw result:", vector)

except Exception as e:
    print(f"\n💥 An exception occurred during the test: {e}")
    print("\nThis likely means one of the following:")
    print("  - The Ollama application is not running on your computer.")
    print("  - Your firewall is blocking the connection to localhost:11434.")
    print("  - The 'nomic-embed-text' model has not been pulled (`ollama pull nomic-embed-text`).")

finally:
    print("--- DEBUG TEST FINISHED ---")