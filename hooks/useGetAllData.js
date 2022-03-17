// TODO: 没写完

function useGetAllData() {
    const [ planYears, setPlanYears ] = useState([]);
    useEffect(() => {
        async function fetchData() {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
    
          var requestOptions = {
            method: "GET",
            headers: myHeaders,
            credentials: "include",
          };
    
          fetch(
            "https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user",
            requestOptions
          )
            .then((response) => {
              if (response.status !== 200) {
                router.push(`/login?redirect=${router.asPath}`);
                setIsShown(false)
              } else {
                console.log("Successfully Login!");
                setIsShown(true)
                response.json().then((data) => {
                  if('data' in data) {
                    console.log(12312312312)
                  }
                  if(data.length !== 0 && 'data' in data) {
                    setPlanYears(data.data.map(each => each.year));
                  }
                  console.log(data)
                });
              }
            })
            .catch((error) => console.log(error));
        }
        if(!isShown){
          fetchData();
        }
      });
    return [planYears]
}

export default useGetAllData;