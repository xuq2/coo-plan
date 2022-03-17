import AntLayout from "../../components/AntLayout";
import EachGoals from "../../components/EachGoals";

export default function Goals() {

    return (
        <>
            <AntLayout hasProfile={true} hasSideBar={true} isShowAddNewPlan={false}>
                <EachGoals />
            </AntLayout>
            
        </>
    )
}