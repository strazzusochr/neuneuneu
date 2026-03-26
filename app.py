from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# Mount correctly point to the 'dist' directory after Vite build
if os.path.exists("dist"):
    app.mount("/", StaticFiles(directory="dist", html=True), name="static")
else:
    @app.get("/")
    def read_root():
        return {"Status": "Dist folder not found. Please build the project."}

@app.get("/health")
def health_check():
    return {"status": "ok", "engine": "Corona Control Ultimate V1.2"}
