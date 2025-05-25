import uvicorn
from fastapi import FastAPI
from fastapi_app.routers import auth, team


app = FastAPI()


@app.get("/")
async def get_zalupa():
    return {"fuck": "shit!"}

@app.get("/xuy")
async def get_xuy():
    return {"fuck": "shit!"}

app.include_router(team.router)
app.include_router(auth.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
