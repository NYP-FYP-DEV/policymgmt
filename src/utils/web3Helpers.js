import {policy, policyInterface} from "./constants";

const checkTransactionCount = async () => {
    const allEvents = await policy.queryFilter("*")
    return allEvents; /// First item is the event signature
}

export const getAllPolicies = async () => 
    checkTransactionCount()
    .then(x => {
        const promises = x.map(y => parseEtherJsLog(y))
        return Promise.all(promises)
    })

export const getLastCreatedPolicy = async (hash) => parseEtherJsLog(policyInterface.parseLog((await checkTransactionCount()).find(x => x.transactionHash === hash)))

export const retrieveDateWithAddress = async (_addr) => {
    const {_date_of_policy} = await policy.getClientInformation(_addr);
    const date = _date_of_policy;
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return day + month;
}

const parseEtherJsLog = (parsed) => {
    let parsedEvent = {}
    for (let i = 0; i < parsed.args.length; i++) {
        const input = parsed.fragment.inputs[i]
        const arg = parsed.args[i]
        const newObj = {...input, ...{"value": arg}}
        parsedEvent[input["name"]] = newObj
    }
    return parsedEvent
}