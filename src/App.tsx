import { Box, Heading, Text, Input, Button, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

function App() {
  const [searchHero, setSearchHero] = useState("");
  const [FilteredCard, setFilteredCard] = useState([]);

  const { data, isLoading } = useQuery("dataCard", async () => {
    const resp = await axios.get("https://api.dazelpro.com/mobile-legends/hero/");
    return resp.data.hero;
  });

  function handleFilteredCard() {
    setFilteredCard(
      data.filter((item: any) => {
        return item.hero_name.toLowerCase().includes(searchHero.toLowerCase());
      })
    );
  }

  return (
    <>
      <Box maxW="1366px" bg="teal.300" minH="100vh" backgroundSize="cover" backgroundRepeat="no-repeat" boxSizing="border-box">
        <Box
          w={{ base: "100%", md: "50%" }}
          p={{ base: "10px", md: "0" }}
          m="0 auto"
          display="grid"
          gridTemplateAreas="'h h''ip btn''card card'"
          gridTemplateColumns="2fr 1fr"
          gridAutoRows="max-content max-content max-content"
          rowGap="1rem"
        >
          <Heading gridArea="h" textAlign="center">
            Mobile Legend Heroes
          </Heading>
          <Input gridArea="ip" bg="floralwhite" placeholder="Search Hero" borderRadius="10px 0 0 10px" value={searchHero} onChange={(e) => setSearchHero(e.target.value)} />
          <Button gridArea="btn" variant="unstyled" bg="teal" color="white" borderRadius="0 10px 10px 0px" onClick={handleFilteredCard}>
            search
          </Button>

          <Box gridArea="card" display="flex" flexWrap="wrap" gap={{ md: "1rem", base: "10px 0" }}>
            {isLoading ? (
              <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" m="2rem auto" />
            ) : FilteredCard.length === 0 ? (
              data.map((item: any, k: number) => (
                <Box key={k} border="1px solid white" w={{ md: "31%", base: "49%" }} m="0 auto" bg="teal" boxSizing="border-box" p="10px" borderRadius="10px" position="relative">
                  <Heading size="sm" textAlign="center" p="0 10px" bg="teal" borderRadius="5px" position="absolute" top="-10px" right="20px" border="1px solid white">
                    {item.hero_name}
                  </Heading>
                  <Text color="white">Role :</Text>
                  <Text borderRadius={"5px"} bg="green.800" color="white">
                    {item.hero_role}
                  </Text>
                  <Text color="white">Specially :</Text>
                  <Text borderRadius={"5px"} bg="chocolate" color="white">
                    {item.hero_specially}
                  </Text>
                </Box>
              ))
            ) : (
              FilteredCard.map((item: any, k: number) => (
                <Box key={k} border="1px solid white" w={{ md: "31%", base: "49%" }} m="0 auto" bg="teal" boxSizing="border-box" p="10px" borderRadius="10px">
                  <Heading size="md" textAlign="center" color="facebook.900">
                    {item.hero_name}
                  </Heading>
                  <Text color="white">Role :</Text>
                  <Text borderRadius={"5px"} bg="green.800" color="white">
                    {item.hero_role}
                  </Text>
                  <Text color="white">Specially :</Text>
                  <Text borderRadius={"5px"} bg="chocolate" color="white">
                    {item.hero_specially}
                  </Text>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
