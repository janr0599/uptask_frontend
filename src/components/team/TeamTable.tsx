import { TeamMember, TeamMembers } from "@/types/teamTypes";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

type TeamTableProps = {
    data: TeamMembers;
    mutate: (args: { projectId: string; memberId: string }) => void;
    projectId: string;
};

function TeamTable({ data, mutate, projectId }: TeamTableProps) {
    const columns: ColumnDef<TeamMember>[] = [
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Actions",
            id: "actions",
            cell: ({ row }) => (
                <button
                    onClick={() => {
                        if (confirm("Do you want to proceed?")) {
                            mutate({
                                projectId,
                                memberId: row.original._id,
                            });
                        }
                    }}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-800">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 border-b border-gray-200 text-left text-lg font-medium text-white"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="even:bg-gray-100">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-2 border-b border-gray-200 text-base font-bold"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamTable;
