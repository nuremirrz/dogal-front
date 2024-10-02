import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  return (
    <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
      <Sidebar />
      <Box ml={{ base: "0", md: "250px" }} w="full">
        <Header />
        <Box mt={{ base: "60px", md: "60px" }} p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
