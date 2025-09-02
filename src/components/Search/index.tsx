import { useState, useEffect } from "react";
import { FaMagnifyingGlass, FaRegCircleXmark } from "react-icons/fa6";

import Fuse from 'fuse.js';

import './Search.css';


interface SearchResult {
    content: string;
    file: string;
    frontmatter: {
        title: string;
        summary: string;
        slug: string;
        tags: Array<string>;
    }
}

interface SearchResults extends Array<SearchResult> {
    count: number;
}


export default function Search(props: any){

    const hidden = {"visibility": "hidden", "height": "0vh"};
    const visible = {"visibility": "visible", "height": "60vh"};

    const [search, setSearch] = useState("");
    const [results, setResults] = useState<null | SearchResults>(null);
    const [visibility, setVisibility] = useState(hidden as React.CSSProperties);

    const options = {
        keys: ['content', 'frontmatter.title', 'frontmatter.summary', 'frontmatter.slug'],
        includeMatches: true,
        minMatchCharLength: 3,
        threshold: 0.5,
    }
    
    const fuse = new Fuse(props.searchList, options);


    useEffect(() => {
        console.log(`SEARCH: ${search}`);

        if(search.length > 2){
            const results = fuse.search(search)
                                .map((result)=>result.item)
                                .slice(0,5);
            console.log(`results ${JSON.stringify(results,null,2)}`)
            setVisibility(visible as React.CSSProperties);
            const nextResults = results as SearchResults
            nextResults.count = results.length;
            setResults(nextResults);
        } else {
            setVisibility(hidden as React.CSSProperties);
            setResults(null);
        }
    },[search])



    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if(event.key === "Escape"){
            clearSearch();
        }
    }

    const clearSearch = () => {
        setSearch("");
        setResults(null);
        setVisibility(hidden as React.CSSProperties);
    }

    const generateResults = (results: null | SearchResults ) => {

        if(results==null){
            return ( <div className="search-results-container"></div> )
        }

        const formattedResults =  results && results.map(
            (result,index)=>{

                const tags = Array.isArray(result.frontmatter.tags) ? result.frontmatter.tags : [];

                const path = result.file.substring(result.file.indexOf('src/content'));
                const file = path.replace(/src\/content/g,"");
                const ext = file.substring(0,file.indexOf("."));
                const slug = ext.replace(/index/g, "");

                return (
                <div key={index} className="search-results-result">
                    <div className="search-results-result-title">
                        <a href={slug}>{result.frontmatter.title}</a>
                    </div>
                    <div className="search-results-result-summary">{result.frontmatter.summary}</div>
                    <div className="search-results-result-tags">
                        { tags.map( (tag: string, index: number) => 
                            <div className="search-results-result-tag" key={index}>
                                {tag}
                            </div>
                        ) }
                    </div>
                </div> 
            )}
        )


        return( 
            <div className="search-results-container" style={{"opacity": "1"}}>
                <div className="search-results-count">Found {results.count} results.</div>
                {formattedResults}             
            </div>
        )
    }

    return (
        <div className="search-container">
            <div className="search-widget">
                <div className="search-controls">
                    <div className="search-icon">
                        <FaMagnifyingGlass style={{"color": "#cecece"}} />
                    </div>
                    { search && search.length > 0 &&
                        <div className="clear-icon" onClick={clearSearch}>
                            <FaRegCircleXmark style={{"color": "#555"}} />
                        </div>
                    }
                    <input type="text" placeholder="Search ..." className="search-input" value={search} onChange={(e)=>setSearch(e.target.value)} onKeyUp={handleKeyUp} />
                </div>
                <div className="search-results" style={visibility}>{generateResults(results)}</div>
            </div>
        </div>
    )
}
