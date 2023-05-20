// import { sample } from "lodash-es";
// import { nameList } from "./utils";
import md5 from "js-md5";

function main() {
  // 注册扩展
  let ext = seal.ext.find('md5');
  if (!ext) {
    ext = seal.ext.new('md5', 'Searina', '1.0.0');
    seal.ext.register(ext);
  }

  // 编写指令
  const cmdmd5 = seal.ext.newCmdItemInfo();
  cmdmd5.name = 'md5';
  cmdmd5.help = '使用.md5 <内容> 生成<内容>的md5hash';

  cmdmd5.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        let text = "";
        cmdArgs.args.forEach(a => text = text + a + " ");
        text = text.substring(0, text.length-1);
        seal.replyToSender(ctx, msg, md5(text));
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }

  // 注册命令
  ext.cmdMap['md5'] = cmdmd5;
}

main();
