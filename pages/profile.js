import Image from "next/image";
import React, { useState } from "react";
import AntLayout from "../components/AntLayout";

export default function Profile() {
    return (
        <AntLayout hasProfile={true} hasSideBar={true} isShowAddNewPlan={false}>
        <h1>profile</h1>
      </AntLayout>
    )
}