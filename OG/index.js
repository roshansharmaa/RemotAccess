const fsPromises = require("fs/promises");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { NodeSSH } = require("node-ssh");

async function run() {
  // ---------------------------------------------------------------------------------------this is for read directory file name
  // const samfilePath = `D:/LERNINGS 12-7/Lern/Gauranga/Terminal/OG/Files`;
  // let dirarray = [];
  // const getDirectories = async (source) => {
  //   (await readdir(source, { withFileTypes: true })).forEach((e) => {
  //     dirarray.push(e.name);
  //   });
  //   console.log(dirarray.sort());
  //   console.log(dirarray.length)
  // };
  // getDirectories(samfilePath);
  // ---------------------------------------------------------------------------------------this is for read directory file name

  const ssh = new NodeSSH();
  // const samplepath = `D:/LERNINGS 12-7/Lern/Gauranga/Terminal/OG/Files/${i}A`;

  for (let i = 1; i <= 10; i++) {
    // -------------------------------------------------------------------------------------this is ssh to connet the remot
    // ssh
    //   .connect({
    //     host: "localhost",
    //     username: "steel",
    //     privateKeyPath: samplepath,
    //   })
    //   .then(function () {
    //     // Local, Remote
    //     ssh
    //       .putFile(
    //         "/home/steel/Lab/localPath/fileName",
    //         "/home/steel/Lab/remotePath/fileName"
    //       )
    //       .then(
    //         function () {
    //           console.log("The File thing is done");
    //         },
    //         function (error) {
    //           console.log("Something's wrong");
    //           console.log(error);
    //         }
    //       );
    //     // Array<Shape('local' => string, 'remote' => string)>
    //     ssh
    //       .putFiles([
    //         {
    //           local: "/home/steel/Lab/localPath/fileName",
    //           remote: "/home/steel/Lab/remotePath/fileName",
    //         },
    //       ])
    //       .then(
    //         function () {
    //           console.log("The File thing is done");
    //         },
    //         function (error) {
    //           console.log("Something's wrong");
    //           console.log(error);
    //         }
    //       );
    //   });
    // -------------------------------------------------------------------------------------this is ssh to connet the remot

    // ----------------------------------this are the steps which will gonna to perform in remot pc
    console.log(`\n== Running ${i}A/${i}A.js ==`);
    try {
      const filePath = `D:/LERNINGS 12-7/Lern/Gauranga/RemotAccess/OG/Files/${i}A/${i}A.js`;
      const Newfilename = `${i}A`;

      // ✅ Read file content
      const data = await fsPromises.readFile(filePath, "utf8");
      fsPromises.appendFile(
        `${filePath}`,
        `\n console.log('This is new Comtent')`
      ); //editing new content

      console.log(`File content:\n${data}`);

      // ✅ Execute the JS file with Node (use full path here too!)
      exec(`node "${filePath}"`, (error, stdout, stderr) => {
        //1 codeerroe 2 output 3throw error
        if (error) {
          console.error("Execution error:", error.message);
          return;
        }
        if (stderr) {
          console.error("Standard Error:", stderr);
        }
        if (stdout) {
          console.log("Output:", stdout);
          fs.mkdir(`New/${Newfilename}`, (err) => {
            // new dir
            if (err) {
              console.error("Error creating directory:", err);
            } else {
              console.log("Directory created successfully!");
              fsPromises
                .writeFile(`New/${Newfilename}/${Newfilename}.txt`, `${stdout}`)
                .then((e) => {
                  console.log(`Succass Full created the file ${Newfilename}`);
                })
                .catch((e) => {
                  console.log(
                    `Failed to created the file ${Newfilename}, error ${e}`
                  );
                });
            }
          });
        }
      });
    } catch (err) {
      console.error("Error reading file:", err.message);
    }
  }
  // ----------------------------------this are the steps which will gonna to perform in remot pc
}

run();

