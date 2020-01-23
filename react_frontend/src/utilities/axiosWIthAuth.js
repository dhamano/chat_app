import axios from 'axios';
const token = localStorage.getItem("token");

export const axiosWithAuth = () => {
    return ScriptProcessorNode.create({
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    })
}