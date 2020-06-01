/* @method 压缩图片
 * @param {imgTag} img标签，还可为base64地址，图片地址，input中的File
 * @param {quality} 图片压缩质量0-1，默认为0.2。如果超出取值范围，将会使用0.92
 * @return {Promise} Promise.then返回压缩后的base64
 */
export function imgCompress(imgTag, quality = 0.1) {
    return new Promise((resolve, reject) => {
        if (!imgTag) reject('参数错误！');
        if (typeof imgTag === 'string') {
            //如果输入的是base64地址，转成img标签并再次调用compress
            let img = new Image();
            img.src = imgTag;
            img.onload = () => imgCompress(img, quality).then(resolve);
        } else if (imgTag.constructor === File) {
            //如果输入的是文件，转成base64地址并再次调用compress
            let reader = new FileReader();
            reader['resolve'] = resolve;
            reader['quality'] = quality;
            reader.onload = function () {
                imgCompress(this.result, this.quality).then(this.resolve);
            }.bind(reader);
            reader.onerror = err => reject(err);
            reader.readAsDataURL(imgTag)
        } else {
            //如果输入的是img标签，获取图片基本信息
            let initSize = imgTag.src.length;//BUG:img地址标签获取到的长度不对
            let width = imgTag.width;
            let height = imgTag.height;
            //创建压缩用的canvas
            //图片canvas
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext('2d');
            //瓦片canvas
            let tCanvas = document.createElement("canvas");
            let tctx = tCanvas.getContext("2d");
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            let ratio;
            if ((ratio = width * height / 4000000) > 1) {
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            //铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            let count;
            if ((count = width * height / 100000) > 1) {
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //计算每块瓦片的宽和高
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                        tctx.drawImage(imgTag, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(imgTag, 0, 0, width, height);
            }
            //获取压缩后的结果
            let ndata = canvas.toDataURL('image/jpeg', quality);
            //删除canvas信息
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            resolve(ndata);
        }
    })
}

export function convertBase64UrlToBlob(urlData, fileType) {
    //将base64编码转换为Blob
    //去掉url的头，并转换为byte
    var bytes = window.atob(urlData.split(',')[1]);
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: fileType });
}
