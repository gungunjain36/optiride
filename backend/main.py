from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the data
df = pd.read_csv("../UberDatasetCleaned.csv")

@app.get("/api/stats")
def get_stats():
    return {
        "total_rides": len(df),
        "total_miles": df["MILES"].sum(),
        "avg_miles": df["MILES"].mean(),
        "categories": df["CATEGORY"].value_counts().to_dict(),
        "purposes": df["PURPOSE"].value_counts().to_dict(),
        "monthly_rides": df["month"].value_counts().sort_index().to_dict()
    }

@app.get("/api/rides")
def get_rides():
    return df.head(100).to_dict(orient="records")  # Return first 100 rides for performance 

@app.get("/api/dashboard")
def get_dashboard_data():
    return {
        "category_distribution": df["CATEGORY"].value_counts().to_dict(),
        "monthly_count": df.groupby("month")["CATEGORY"].count().to_dict(),
        "daily_count": df.groupby("day")["CATEGORY"].count().sort_values(ascending=False).to_dict(),
        "purpose_by_category": {
            "data": df.groupby(["PURPOSE", "CATEGORY"]).size().reset_index(name="count").to_dict("records")
        },
        "miles_by_time": df.groupby("day_time")["MILES"].sum().to_dict(),
        "monthly_stats": {
            "count": df.groupby("month")["CATEGORY"].count().to_dict(),
            "miles": df.groupby("month")["MILES"].sum().to_dict()
        }
    }