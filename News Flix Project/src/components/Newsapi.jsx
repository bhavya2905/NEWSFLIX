import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

 
export default function Newsapi({category}){

    const [Data,setData] = useState("");

    const fetchdata = async () => {
        await axios
        .get(

            category?`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=bb5a12bb049741f68df2f32d619a9f8c`:
            "https://newsapi.org/v2/top-headlines?country=in&apiKey=bb5a12bb049741f68df2f32d619a9f8c"
        )
        .then((res) => setData(res.data.articles));
    };
    useEffect(()=>{
        fetchdata();
    },[category]);
    
    return (
    <div className="container" style={{marginTop: "100px"}}>
        
        <h3> 
            <u> {category.toUpperCase()} - TOP HEADLINES </u>
        </h3>
        
        <div className="container d-flex justify-content-center align-items-center flex-column my-3">
            { Data ?
            Data.map((items,index)=>(
                <div key={index}>
                    <div className="container my-3 p-3" style={{width: "600px", boxShadow: "2px 2px 10px red", borderRadius:"10px" }}>
                        <h5 className="my-2">{items.title}</h5>
                        <div className="d-flex justify-content-center align-items-center">
                            <img 
                            src={items.urlToImage}
                            alt="Image Not Found"
                            style={{
                                width:"100%",
                                height:"300px",
                                objectFit:"cover",
                            }} />
                        </div>

                        <p className="my-1">{items.description}</p>
                        
                        <a href={items.url} target="_blank">view More</a>
                    </div>
                </div>
            ))  : "LOADING..."  
        }
        </div>
    </div>
    );
};

