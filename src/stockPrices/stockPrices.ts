import axios from "axios";


const getCurrentPrice = async (symbol: string) => {
    return axios.post<{ price: number }>(
        `https://us-central1-stockbot-edd4e.cloudfunctions.net/getCurrentStockPrice`,
        {
            symbol
        }
    );
}

export default getCurrentPrice
