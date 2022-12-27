import useStore from 'hooks/useStore';
import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import useRetrievingOwnerAssetsQuery from 'hooks/useRetrievingOwnerAssetsQuery';
import { Card, CardText } from 'reactstrap';
import Cell from 'components/Cell';
import { Link } from 'react-router-dom';
import CopyButton from 'components/CopyButton';


const RowCell = ({ account }) => {
    const { isError, isLoading, error, data } = useRetrievingOwnerAssetsQuery(account);
    if (isLoading) {
        return <div className="content">
            <span>Loading...</span>
        </div>
    }

    if (isError) {
        return <div className="content">
            <span>Error: {error.message}</span>
        </div >
    }
    return <>
        <Card className="p-3" >
            <CardText className="row p-3 mb-3">
                <h3 className="p-2">지갑 주소</h3><CopyButton text={account}></CopyButton>
            </CardText>
            <div className="row justify-content-center">
                {data.map(asset => {
                    return <Link key={asset.id} to={`/asset/${asset?.asset_contract?.address}/${asset?.token_id}`}>
                        <Cell asset={asset}></Cell>
                    </Link>
                })}
            </div>
        </Card>
    </>
}


const MyPage = observer(() => {
    const { blockchainStore } = useStore();
    const { account } = blockchainStore?.blockchain;
    return (
        <div className="content">
            {account !== "" && <RowCell account={account}></RowCell>}
            {account === "" && <div>지갑을 연결하세요</div>}
        </div>
    );
})
export default MyPage;