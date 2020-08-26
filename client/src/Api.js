const getAllLogEntries = async () => {
    const response = await fetch('http://localhost:1337/api/logs')
    return response.json()
}

module.exports = getAllLogEntries