import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { truncateAddr } from "@/library/fonctions";
import { ITransactionResult } from "@/library/interfaces";
import React from "react";
import { Column, useTable } from "react-table";

export default function TransactionTable() {
    const { paramsSniper, dataERC20 } = useMyState();
    const { myAccount } = useMyTransaction();
    const transactions = [...myAccount!.resultBuy, ...myAccount!.resultSell];
    const data = React.useMemo(() => transactions, [transactions]);

    const columns = React.useMemo(
        () => [
            {
                Header: "Transaction Hash",
                accessor: "hash", // Identifie la clé d'accès pour cette colonne
                Cell: ({ value }: { value: string }) => (
                    <a
                        title="Check Transaction"
                        target="_blank"
                        href={`${paramsSniper.blockchain.addressExplorer}tx/${value}`}
                    >
                        {truncateAddr(value)}
                    </a>
                ),
            },

            {
                Header: paramsSniper.blockchain.symbol,
                accessor: "amountETH",
            },
            {
                Header: "Tokens " + dataERC20?.symbol,
                accessor: "amountToken",
            },
        ],
        []
    ) as Column<ITransactionResult>[];

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <table {...getTableProps()} style={{ width: "100%", margin: "0 auto" }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
