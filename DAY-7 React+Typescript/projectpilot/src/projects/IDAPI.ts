const baseUrl = 'http://localhost:4000';
const url = `${baseUrl}/counter/1`;

function translateStatusToErrorMessage(status: number){
    switch (status){
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the project(s).';
        default:
            return 'There was an error retrieving the project(s). Please try again.';
    }
}

function checkStatus(response: any){
    if(response.ok){
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response){
    return response.json();
}

const idAPI = {
    async getNextID() : Promise<number> {
        try{
            const response = await fetch(url);
            const response_1 = await checkStatus(response);
            const data = await parseJSON(response_1);
            const currentID = data.lastIDUsed;
            const newID = currentID + 1;

            const putResponse = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: 1,
                    lastIDUsed: newID
                }),
            });
            
            await checkStatus(putResponse);
            return newID;
        } catch (error) {
            console.log('log client error ' + error);
            throw new Error('There was an error retrieving the projects. Please try again.');
        }
    }
};

export { idAPI };