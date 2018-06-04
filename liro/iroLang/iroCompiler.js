class LiroCompiler {
    static compile(programString) {
        const programLines = programString.split(/(\r\n)|(\n)/);
        programLines.forEach(line => {
            const lineTokens = line.split(/\s/);
            lineTokens.forEach(token => {
                console.log(token, " ");
            })
        });
    }
}
