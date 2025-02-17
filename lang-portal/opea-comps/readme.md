## Running Ollama Third-Party Service


### Choosing a Model
Get the model_id that Ollama launches from the [Ollama Library](https://ollama.com/library).

e.g, https://ollama.com/library/llama3.2


### Getting the Host IP
#### macOS
```
ipconfig getifaddr en0
```

### Running the Docker container
In opea-comps:
```
NO_PROXY=localhost LLM_ENDPOINT_PORT=9000 LLM_MODEL_ID="llama3.2" host_ip=10.0.0.25 docker compose up 
```
Replace the model, host IP, and endpoint port as needed.


### Ollama API
Once the Ollama server is running we can make API calls to the Ollama API.

https://github.com/ollama/ollama/blob/main/docs/api.md

### Pull a Model
```
curl http://localhost:9000/api/pull -d '{
  "model": "llama3.2"
}'
```

### Generate a Request
```
curl http://localhost:9000/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Why is the sky blue?"
}'
```

### Example response
```
{"model":"llama3.2","created_at":"2025-02-17T05:21:42.080078Z","response":"The","done":false}
{"model":"llama3.2","created_at":"2025-02-17T05:21:42.098595Z","response":" sky","done":false}
{"model":"llama3.2","created_at":"2025-02-17T05:21:42.117376Z","response":" appears","done":false}
{"model":"llama3.2","created_at":"2025-02-17T05:21:42.136507Z","response":" blue","done":false}
{"model":"llama3.2","created_at":"2025-02-17T05:21:42.155406Z","response":" because","done":false}
{"model":"llama3.2","created_at":"2025-02-17T05:21:42.174502Z","response":" of","done":false}
{"model":"llama3.2","created_at":"2025-02-17T05:21:42.193751Z","response":" a","done":false}
{"model":"llama3.2","created_at":"2025-02-17T05:21:42.21324Z","response":" phenomenon","done":false}
{"model":"llama3.2","created_at":"2025-02-17T05:21:42.232431Z","response":" called","done":false}
{"model":"llama3.2","created_at":"2025-02-17T05:21:42.251969Z","response":" scattering","done":false}
```


### Virtual Environment
#### Activate the Virtual Environment
```
source mega-service/virtual-env/bin/activate
```

#### Install opea-comps
```
pip install opea-comps
``` 

https://opea-project.github.io/latest/GenAIComps/README.html#megaservice

#### Check Installation
```
pip list | grep opea-comps
``` 

#### Deactivate the Virtual Environment
```
deactivate
```