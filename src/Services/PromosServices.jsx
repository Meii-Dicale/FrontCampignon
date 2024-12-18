import axios from "axios";

const AjouterPromotion = (data) => { 

    return axios.post('http://localhost:3001/api/promotion/add', data );
}

const deletePromo = (idPromotion) => { 

    return axios.delete(`http://localhost:3001/api/promotion/${idPromotion}`);
}

const fetchPromo = () => {
    return axios.get('http://localhost:3001/api/promotion/toutes');
}

export default { AjouterPromotion  };
export { fetchPromo, deletePromo};

