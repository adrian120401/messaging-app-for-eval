import useQuery from "./useQuery";
import { AuthService } from "../api/domain/auth/auth.service";

export const useLogin = () => {
    const service = new AuthService();

    return useQuery({
        fetchFn: service.login.bind(service),
    });
};
