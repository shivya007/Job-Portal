import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="container mx-auto my-8 p-4">
      <Table className="min-w-full border-collapse">
        <TableCaption className="text-lg font-semibold mb-4">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="border-b-2">Logo</TableHead>
            <TableHead className="border-b-2">Name</TableHead>
            <TableHead className="border-b-2">Date</TableHead>
            <TableHead className="text-right border-b-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <tr key={company._id} className="hover:bg-gray-50">
              <TableCell className="py-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={company.logo}
                    alt={`${company.name} logo`}
                  />
                </Avatar>
              </TableCell>
              <TableCell className="py-4">{company.name}</TableCell>
              <TableCell className="py-4">
                {company.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="py-4 text-right">
                <Popover>
                  <PopoverTrigger className="bg-[#74aada]">
                    <MoreHorizontal className="cursor-pointer text-[#22303c] hover:text-gray-700" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 p-2 shadow-md bg-white">
                    <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-gray-100 rounded">
                      <Edit2 className="w-4 text-gray-600" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
