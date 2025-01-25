import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';


import { getUserByHandle } from '../api/DevTreeAPI';
import Loader from '../components/Loader';
import HandleData from '../components/HandleData';

export default function HandleView() {

    const { handle } = useParams()!

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => {
            return getUserByHandle(handle!)
        },
        queryKey: ['handle', handle],
        retry: 1,
        refetchOnWindowFocus: true
    })

    if (isLoading) return <Loader />

    if (isError) return <Navigate to='/404' />

    if (data) return <HandleData data={data} />
}
