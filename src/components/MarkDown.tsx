import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkDown = () => {
    const [markdownContent, setMarkdownContent] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/about-project.md')
            .then((response) => response.text())
            .then((text) => setMarkdownContent(text)).finally(() => setLoading(false));
    }, []);

    return (

        <section className="p-5 text-white md:p-16 markdown">
            <h1 className="my-4 text-3xl text-center uppercase">About Project</h1>
            {
                loading ? (<div className="h-screen"><p>Loading...</p></div>) : (<ReactMarkdown>{markdownContent}</ReactMarkdown>)
            }

        </section>

    )
}

export default MarkDown
