const Discord = require("discord.js");
const { execSync } = require("child_process");
const { token} = require('./disc_config.json');
const fs = require('fs');
const request = require('request');
const client = new Discord.Client();
client.login(token);

let media_urls = []

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {

let bot_mention = false;
let mentioned_user_id=''

if(msg.mentions.users.find((mentionedUser) => mentionedUser.id === client.user.id))
{
    bot_mention=true;
    mentioned_user_id = msg.author.id
}

if(bot_mention)
{
try{

    if(msg.content.includes('setvid'))
    {
        let tag = '<@' + mentioned_user_id.toString() +'>'

        let final_msg = tag + ' ayo bossman going to change the video to the one u attached :)'

        msg.channel.send(final_msg);

        download(msg.attachments.array()[0].url,'disc_vid.mp4',function () {

            console.log('downloaded :)')

        })

        //msg.channel.send(msg.attachments.array()[0].url)



    }

    else {
        let tag = '<@' + mentioned_user_id.toString() + '>'

        let final_msg = tag + ' ayo bossman! I gotchu'

        await msg.channel.send(final_msg);

        let filename = 'disc_image.png'

        console.log(filename)

        download(msg.attachments.array()[0].url,filename,function () {

            console.log('downloaded :)')

            try {
                execSync(
                    "conda activate deepFake"
                );

                console.log("here1");
                execSync(
                    "cd C:\\Users\\asus\\Desktop\\dameBot\\first-order-model\\ && E:/Installations/Anaconda/envs/deepFake/python.exe C:\\Users\\asus\\Desktop\\dameBot\\first-order-model\\driving_code_disc.py"
                );

                console.log("here2");
                execSync(
                    'C:\\Users\\asus\\Desktop\\damebot\\ffmpeg_static\\bin\\ffmpeg.exe -i C:\\Users\\asus\\Desktop\\dameBot\\first-order-model\\disc_out.mp4 -r 30 -filter:v "setpts=PTS/3" C:\\Users\\asus\\Desktop\\dameBot\\first-order-model\\disc_out_fps.mp4 -y'
                );

                console.log("here3");
                execSync(
                    "C:\\Users\\asus\\Desktop\\damebot\\ffmpeg_static\\bin\\ffmpeg.exe -i C:\\Users\\asus\\Desktop\\dameBot\\first-order-model\\disc_out_fps.mp4 -i C:\\Users\\asus\\Desktop\\dameBot\\disc_vid.mp4 -c copy -map 0:v0 -map 1:a0 -shortest C:\\Users\\asus\\Desktop\\dameBot\\first-order-model\\disc_final.mp4 -y"
                );

                var filepath = 'C:/Users/asus/Desktop/dameBot/first-order-model/twitter_final.mp4'

                console.log("here4");

                msg.channel.send("Done! ",{
                    files: [{
                        attachment: 'C:\\Users\\asus\\Desktop\\dameBot\\first-order-model\\disc_final.mp4',
                        name: 'disc_final.mp4'
                    }]
                })
                    .then(console.log)
                    .catch(console.error);


            } catch (err) {
                console.warn("Failed to respond to mention.");
                console.warn(err);
            }

        })


    }
}catch (e) {
    console.log('error occured:')
    console.log(e)
}

}

});