import { useRouter } from 'next/router';
import AntLayout from '../../components/AntLayout';

export default function YearItem() {
    const router = useRouter();
    console.log("==router.query: ", router.query);
    

    return (
        <AntLayout hasProfile={true} hasSideBar={true}>
            <h1>This is {router.query.year}</h1>
        </AntLayout>
    );
}