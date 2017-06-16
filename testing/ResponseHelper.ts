export function returnOk(body = {}, headers: any = {})
{
    return returnResponse(body, headers);
}

export function returnNotFound(body = {}, headers: any = {})
{
    return returnResponse(body, headers, 404);
}

function returnResponse(body, headers: any = {}, status: number = 200)
{
    if (!headers["Content-Type"])
    {
        headers["Content-Type"] = "application/json+ld";
    }

    return new Response(
        JSON.stringify(body),
        {
            status: status,
            headers: headers
        });
}