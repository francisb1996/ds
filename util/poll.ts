export default async function poll(rate: number, times: number, fn: (interval: NodeJS.Timeout, resolve: Function)=>Promise<any>): Promise<void> {
    await new Promise((resolve, reject) => {
        let counter = 0;
        const interval = setInterval(async () => {
            await fn(interval, resolve)
            counter++
            if (counter === times) {
                console.warn('polling timout')
                clearInterval(interval)
                reject('polling timout')
            }
        }, rate)
    })
}