import { useLocation } from "react-router-dom"

function useQuery(props) {
    return new URLSearchParams(useLocation().search).get("q");
}


export { useQuery }

