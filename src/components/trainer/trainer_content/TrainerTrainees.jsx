import React, {useState} from "react";
import one from '../../../trainees_image/1.jpg';
import TraineeResult from "../../all_trainees_reasult/all_trainee_result.component"
import {Container} from "@material-ui/core";


const TrainerTrainees = (props) => {
    let allTrainees = [{trainer_id:"100000001",first_name:"trainer", last_name:"1", image: "https://lh3.google.com/u/0/pgc/AF1QipMlgq9oWHdLOhaTf9Vdun1ojNMz0T9sSWNHtgXI=w464-h210-no-iv69582" },
        {trainer_id:"100000002",first_name:"trainer", last_name:"2", image: one },
        {trainer_id:"100000003",first_name:"trainer", last_name:"3", image: "https://lh3.googleusercontent.com/o6BrjsyJBg0dN28TlOdGIhRCuvE5wu8JXCVs2IVwQXxkVPZxj4TGVRmRA0itt9obp71Y1Vz1-69zx17rBU98c2wQhwf_E3dMEC0fGI20oJACzGyvthdmuRi0X1eKjOPsf5tMIOjU8EG7eiA0TBKTwtS38xHCGiEOYAsa1o6X3eLqxFTJxHx_E0ujKyUzGwuxruNZxVOMR_xKtSOUhd9O-D1FnMXaUkAMLFs4LsnjUUWIJR9MK7xJ8A6dB1bCrAX-mNe-PYxKkYMQgMqE5CBAulCM4hbsEFx7YbcwLnnb5csha7eoif4Pgw4BLL3N3pgNIe3TjbEoQhquNP-S2NOwMFA3KF27YWSNP_cbL8WgD-iUX1YtBOyNocNfzmHzHXjx4wW_loNL1uLKr2UjVK1pqNREOh0ggHUGIbNYUEhNk3zK_gN_Bgq2ai6tiC-vyGKcXF-oHn3FLbP4spS9YMnf0TgGX7QTMg7qXpEUjV8798M6KMyTGqgJU-YjXasLdf3K-AN1Ox9TmeL7T4KSd44nykS8iew_hfQ-J-Ul23lR5Vs7N5HTUpgBCp5KNyA_vINiFHGxjSLDeUrmfbNHXR4rvLKbzP7VOepTw9_V173f-QJuW01wUigFTknAwJfdSPhgsYYdUGECHHw3EzqJIeMMlmMRycp2MdZ-eepGVrOZh-DIjxKz_VNWDP2VM5EdFc3MZj-I1Xoj3hWwvnicx5C5ZbEgIQ=w1920-h867-no?authuser=0" },
        {trainer_id:"100000004",first_name:"trainer", last_name:"4", image: "null" },
        {trainer_id:"100000005",first_name:"trainer", last_name:"5", image: "null" },
        {trainer_id:"100000006",first_name:"trainer", last_name:"6", image: "null" },
        {trainer_id:"100000007",first_name:"trainer", last_name:"7", image: "null" },
        {trainer_id:"100000008",first_name:"trainer", last_name:"8", image: "null" },
        {trainer_id:"100000009",first_name:"trainer", last_name:"9", image: "null" },
        {trainer_id:"100000010",first_name:"trainer", last_name:"10", image: "null" },
        {trainer_id:"100000011",first_name:"trainer", last_name:"11", image: "null" },
    ]

    return(
        <Container>
            <h1>המתאמנים שלך</h1>
            <TraineeResult listOfTrainees={allTrainees}/>
        </Container>
    )
}

export default TrainerTrainees