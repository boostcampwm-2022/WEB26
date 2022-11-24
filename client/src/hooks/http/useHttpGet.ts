import useAxios from "./useAxios";
const useGet = () => {
    const { isLoading, setIsLoading, error, setError, axios } = useAxios();

    const get = (url: string, query?: { [key: string]: any }) => {
        setError(null);
        setIsLoading(true);
        return axios
            .get(url, {
                data: query,
            })
            .then((res) => {
                setIsLoading(false);
                return res.data;
            })
            .catch(setError);
    };
    return { isLoading, error, get };
};

export default useGet;
