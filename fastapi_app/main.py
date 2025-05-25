import uvicorn
from fastapi import FastAPI
from fastapi_app.routers import auth, paper


app = FastAPI()

app.include_router(paper.router)
app.include_router(auth.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
