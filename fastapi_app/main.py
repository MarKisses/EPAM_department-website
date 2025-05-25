import uvicorn
from fastapi import FastAPI
from fastapi_app.routers import auth, paper


app = FastAPI()


@app.get("/")
async def get_zalupa():
    return {"fuck": "shit!"}

@app.get("/xuy")
async def get_xuy():
    return {"fuck": "shit!"}

app.include_router(paper.router)
app.include_router(auth.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
