import React, { useEffect, useState } from "react";
import reqService from "@/appwrite/req.config";
import { useNavigate, useParams } from "react-router-dom";
import { Notes } from "./index.js";

function FulReq() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
        reqService.getReq(slug).then((post) => {
            if (post) {
            setPost(post);
            }
        });
        } else {
        navigate("/");
        }
    }, [slug, navigate]);
    return post ? (
        <div className="py-8">
            <Notes post={post} />
        </div>
    ) : null;
}

export default FulReq;
