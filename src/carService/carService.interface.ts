export interface CarService {
    name: string;
    description: string;
    price: number;
    duration: number;
    isDeleted?: boolean;
}
