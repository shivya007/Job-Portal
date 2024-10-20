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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();
  useEffect(() => {
    if (!allAdminJobs) return;  // Ensure allAdminJobs is defined
    const filteredJobs =
    allAdminJobs.length > 0 &&
    allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="container mx-auto my-8 p-4">
      <Table className="min-w-full border-collapse">
        <TableCaption className="text-lg font-semibold mb-4">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="border-b-2">Name</TableHead>
            <TableHead className="border-b-2">Role</TableHead>
            <TableHead className="border-b-2">Date</TableHead>
            <TableHead className="text-right border-b-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(filterJobs) && filterJobs?.map((job) => (
            <tr key={job._id} className="hover:bg-gray-50">
              <TableCell className="py-4">{job?.company?.name}</TableCell>
              <TableCell className="py-4">{job?.title}</TableCell>
              <TableCell className="py-4">
                {job?.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="py-4 text-right">
                <Popover>
                  <PopoverTrigger className="bg-[#74aada]">
                    <MoreHorizontal className="cursor-pointer text-gray-500 hover:text-gray-700" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 p-2 shadow-md bg-white">
                    <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-gray-100 rounded">
                      <Edit2 className="w-4 text-gray-600" />
                      <span>Edit</span>
                    </div>
                    <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
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

export default AdminJobsTable;
