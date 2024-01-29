const fs = require('fs');
const { exec } = require('child_process');

const generatePrismaErd = (req, res) => {
    const { data } = req.body;
    const filename = generateRandomFileName();
    const prismaPath = `./prismas/${filename}.prisma`;
    const htmlPath = `./prismas/${filename}.html`;

    fs.writeFile(prismaPath, data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        exec(`node bundle.cjs ${prismaPath} ${htmlPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error generating HTML');
            }

            fs.readFile(htmlPath, 'utf8', (err, htmlData) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error reading HTML file');
                }

                fs.unlink(prismaPath, (err) => {
                    if (err) console.error(err);
                });

                fs.unlink(htmlPath, (err) => {
                    if (err) console.error(err);
                });

                res.status(200).send(htmlData);
            });
        });
    });
};

const generateRandomFileName = () => {
    const randomString = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    return `${randomString}_${timestamp}`;
};

module.exports = {
    generatePrismaErd,
};
