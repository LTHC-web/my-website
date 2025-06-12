// script.js
// script.js
// 元素引用
const progressBar = document.getElementById('progressBar');
const loaderContainer = document.querySelector('.loader-container');
const loadingContent = document.querySelector('.loading-content');
const sticker = document.getElementById('sticker');
const mainMenuContainer = document.getElementById('mainMenuContainer');
const menuBtn = document.getElementById('menuBtn');
const menuDropdown = document.getElementById('menuDropdown');
const contactLink = document.getElementById('contactLink');
const formLink = document.getElementById('formLink');
const aboutLink = document.getElementById('aboutLink');
const contactModal = document.getElementById('contactModal');
const contactImage = document.getElementById('contactImage');
const formModal = document.getElementById('formModal');
const formContent = document.getElementById('formContent');
const closeFormModal = document.getElementById('closeFormModal');
const submitForm = document.getElementById('submitForm');
const formLoader = document.getElementById('formLoader');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');
const aboutModal = document.getElementById('aboutModal');
const aboutContent = document.getElementById('aboutContent');
const closeAboutModal = document.getElementById('closeAboutModal');
const zhBtn = document.getElementById('zhBtn');
const enBtn = document.getElementById('enBtn');
const languageToggleContainer = document.getElementById('languageToggleContainer');

// 社交按钮
const xiaohongshuBtn = document.getElementById('xiaohongshuBtn');
const weiboBtn = document.getElementById('weiboBtn');
const douyinBtn = document.getElementById('douyinBtn');

// 轮播图相关元素
const pattern3 = document.getElementById('pattern3'); // 黄色三角图案（已替换为图片）
const pattern4 = document.getElementById('pattern4'); // 红色菱形图案
const pattern5 = document.getElementById('pattern5'); // 粉色菱形图案（已替换为图片）
const radioImage = document.getElementById('radioImage'); // 新增的radio图片
const tvImage = document.getElementById('tvImage'); // 新增的TV图片
const carouselModal = document.getElementById('carouselModal');
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const closeCarousel = document.getElementById('closeCarousel');

// 图片放大相关元素
const imageModal = document.getElementById('imageModal');
const imageModalImg = document.getElementById('imageModalImg');
const closeImageModal = document.getElementById('closeImageModal');

// 蓝色圆形图案上的进度条
const pattern1 = document.getElementById('pattern1');
const circleImage = document.getElementById('circleImage');

// 当前图片状态
let isImage1 = true;

// 语言切换功能
const translateElements = document.querySelectorAll('.lang-text');

// 新增语言切换图片元素
const zhImg = document.getElementById('zhImg');
const enImg = document.getElementById('enImg');

function updateLanguage(lang) {
    translateElements.forEach(element => {
        if (element.dataset[lang]) {
            element.textContent = element.dataset[lang];
        }
    });
    document.querySelector('html').setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en-US');
    
    // 更新选中状态
    if (lang === 'zh') {
        zhImg.classList.add('active');
        enImg.classList.remove('active');
    } else {
        enImg.classList.add('active');
        zhImg.classList.remove('active');
    }
}

// 默认设置为中文
updateLanguage('zh');

// 添加缩放动画效果
function addScaleAnimation(imgContainer) {
    const img = imgContainer.querySelector('.lang-img');
    img.style.transform = 'scale(1.2)';
    setTimeout(() => {
        if (imgContainer.classList.contains('active')) {
            img.style.transform = 'scale(1.1)';
        } else {
            img.style.transform = 'scale(1)';
        }
    }, 300);
}

// 中文图片点击事件
zhImg.addEventListener('click', () => {
    if (!zhImg.classList.contains('active')) {
        updateLanguage('zh');
        addScaleAnimation(zhImg);
    }
});

// 英文图片点击事件
enImg.addEventListener('click', () => {
    if (!enImg.classList.contains('active')) {
        updateLanguage('en');
        addScaleAnimation(enImg);
    }
});

// 切换菜单显示
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuDropdown.classList.toggle('show');
});

// 点击其他地方关闭菜单
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.classList.remove('show');
    }
});

// 联系我们功能 - 显示模态框
contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    menuDropdown.classList.remove('show');
    contactModal.style.display = 'flex';
});

// 关闭联系模态框
contactImage.addEventListener('click', () => {
    contactModal.style.display = 'none';
});

// 提交表单功能 - 显示表单模态框
formLink.addEventListener('click', (e) => {
    e.preventDefault();
    menuDropdown.classList.remove('show');
    formModal.style.display = 'block';
    setTimeout(() => {
        formContent.classList.add('show');
    }, 10);
});

// 关闭表单模态框
closeFormModal.addEventListener('click', () => {
    formContent.classList.remove('show');
    setTimeout(() => {
        formModal.style.display = 'none';
    }, 500);
});

// 提交表单
submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        formError.textContent = document.querySelector('.lang-text[data-zh="请填写所有必填字段"]').dataset[document.documentElement.lang === 'zh-CN' ? 'zh' : 'en'];
        formError.style.display = 'block';
        formSuccess.style.display = 'none';
        return;
    }

    if (!isValidEmail(email)) {
        formError.textContent = document.querySelector('.lang-text[data-zh="请输入有效的电子邮箱地址"]').dataset[document.documentElement.lang === 'zh-CN' ? 'zh' : 'en'];
        formError.style.display = 'block';
        formSuccess.style.display = 'none';
        return;
    }

    formLoader.style.display = 'block';
    formError.style.display = 'none';
    formSuccess.style.display = 'none';

    setTimeout(() => {
        formLoader.style.display = 'none';
        formSuccess.textContent = document.querySelector('.lang-text[data-zh="表单提交成功！我们会尽快回复您。"]').dataset[document.documentElement.lang === 'zh-CN' ? 'zh' : 'en'];
        formSuccess.style.display = 'block';
    }, 2000);
});

// 邮箱验证函数
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// 关于我们功能 - 显示关于我们模态框
aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    menuDropdown.classList.remove('show');
    aboutModal.style.display = 'block';
    setTimeout(() => {
        aboutContent.classList.add('show');
    }, 10);
});

// 关闭关于我们模态框
closeAboutModal.addEventListener('click', () => {
    aboutContent.classList.remove('show');
    setTimeout(() => {
        aboutModal.style.display = 'none';
    }, 500);
});

// 点击创建贴纸的函数
function createClickSticker(x, y) {
    const sticker = document.createElement('div');
    sticker.classList.add('click-sticker');
    
    const types = ['circle', 'square', 'triangle', 'diamond', 'star', 'heart'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    sticker.classList.add(`${randomType}-sticker`);
    
    const colors = [
        '#FF5252', '#4CAF50', '#2196F3', '#FF9800',
        '#9C27B0', '#00BCD4', '#E91E63', '#FFEB3B'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    sticker.style.left = `${x}px`;
    sticker.style.top = `${y}px`;
    sticker.style.backgroundColor = randomColor;
    
    loaderContainer.appendChild(sticker);
    
    setTimeout(() => {
        sticker.remove();
    }, 1000);
}

// 创建气泡提示的函数
function createBubble(text, x, y) {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.classList.add('bubble-container');
    
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = text;
    bubbleContainer.appendChild(bubble);
    
    // 设置气泡位置
    bubbleContainer.style.position = 'fixed';
    bubbleContainer.style.left = `${x}px`;
    bubbleContainer.style.top = `${y}px`;
    
    document.body.appendChild(bubbleContainer);
    
    // 显示气泡
    setTimeout(() => {
        bubble.classList.add('show');
    }, 10);
    
    // 3秒后移除气泡
    setTimeout(() => {
        bubble.classList.add('fade-out');
        setTimeout(() => {
            bubbleContainer.remove();
        }, 3000); // 等待渐隐动画完成
    }, 3000);
}

// 添加点击事件监听
loaderContainer.addEventListener('click', (e) => {
    const progressContainer = document.querySelector('.progress-container');
    if (!progressContainer.contains(e.target)) {
        createClickSticker(e.clientX, e.clientY);
    }
});

// 社交按钮链接设置
document.addEventListener('DOMContentLoaded', () => {
    xiaohongshuBtn.href = 'https://www.xiaohongshu.com/'; // 替换为您的小红书链接
    weiboBtn.href = 'https://weibo.com/'; // 替换为您的微博链接
    douyinBtn.href = 'https://www.douyin.com/'; // 替换为您的抖音链接
    
    // 为按钮添加悬停动画
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const rect = button.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createClickSticker(x, y);
        });
    });
    
    // 初始化轮播图 - 使用 GIF 图片
    const gifImages = [
        'https://example.com/your-gif-1.gif', // 替换为您的第一个 GIF 链接
        'https://example.com/your-gif-2.gif', // 替换为您的第二个 GIF 链接
        'https://example.com/your-gif-3.gif', // 替换为您的第三个 GIF 链接
        'https://example.com/your-gif-4.gif'  // 替换为您的第四个 GIF 链接
    ];
    
    const pattern5Images = [
        'https://via.placeholder.com/800x400/FF69B4/FFFFFF?text=Image+1',
        'https://via.placeholder.com/800x400/FF69B4/FFFFFF?text=Image+2',
        'https://via.placeholder.com/800x400/FF69B4/FFFFFF?text=Image+3',
        'https://via.placeholder.com/800x400/FF69B4/FFFFFF?text=Image+4'
    ];
    
    let currentSlide = 0;
    
    function renderCarousel(images) {
        carouselTrack.innerHTML = '';
        images.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            slide.innerHTML = `<img src="${src}" alt="${images === gifImages ? 'Carousel GIF' : 'Carousel Image'} ${index + 1}">`;
            slide.addEventListener('click', () => {
                imageModalImg.src = src;
                imageModal.style.display = 'flex';
            });
            carouselTrack.appendChild(slide);
        });
    }
    
    // 轮播图控制
    function showSlide(index, images) {
        if (index < 0) {
            currentSlide = images.length - 1;
        } else if (index >= images.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // 黄色三角图案点击事件（已替换为图片）
    pattern3.addEventListener('click', () => {
        renderCarousel(gifImages);
        carouselModal.style.display = 'block';
    });
    
    // 粉色菱形图案点击事件（已替换为图片）
    pattern5.addEventListener('click', () => {
        renderCarousel(pattern5Images);
        carouselModal.style.display = 'block';
    });
    
    // 轮播图切换按钮事件
    carouselPrev.addEventListener('click', () => {
        showSlide(currentSlide - 1, gifImages);
    });
    
    carouselNext.addEventListener('click', () => {
        showSlide(currentSlide + 1, gifImages);
    });
    
    // 关闭轮播图
    closeCarousel.addEventListener('click', () => {
        carouselModal.style.display = 'none';
    });
    
    // 关闭图片放大模态框
    closeImageModal.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });
    
    imageModalImg.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });
    
    // 点击图片放大模态框空白区域关闭
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
    
    // 加载进度
    let progress = 0;
    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loaderContainer.style.opacity = '0';
                loaderContainer.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    loaderContainer.style.display = 'none';
                    loadingContent.style.display = 'block';
                    loadingContent.style.opacity = '1';
                    loadingContent.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        mainMenuContainer.style.display = 'block';
                        languageToggleContainer.classList.add('loaded');
                    }, 500);
                }, 500);
            }, 500);
        } else {
            progress += 2.5;
            progressBar.style.width = progress + '%';
            sticker.style.left = progress + '%';
            document.querySelector('.text').textContent = `正在加载中... ${Math.floor(progress)}%`;
        }
    }, 40);
    
    // 蓝色圆形图案点击事件
    let clickProgress = 9999;
    pattern1.addEventListener('click', (e) => {
        circleImage.src = 'images/挨打_2.jpg'; // 切换到第二张图片
        circleImage.style.transition = 'transform 0.3s ease';
        circleImage.style.transform = 'scale(1.1)'; // 初始放大效果
        
        // 短暂停留后恢复
        setTimeout(() => {
            circleImage.src = 'images/挨打_1.jpg'; // 恢复到第一张图片
            circleImage.style.transform = 'scale(1)'; // 恢复原始大小
        }, 300); // 停留 0.3 秒
        
        if (clickProgress > 0) {
            clickProgress--;
            document.getElementById('expValue').textContent = clickProgress;
            document.getElementById('expFill').style.width = `${(clickProgress / 9999) * 100}%`;
            
            // 创建-1的动画效果
            const minusOne = document.createElement('div');
            minusOne.classList.add('minus-one');
            minusOne.textContent = '-1';
            minusOne.style.left = `${e.offsetX}px`;
            minusOne.style.top = `${e.offsetY}px`;
            pattern1.appendChild(minusOne);
            
            setTimeout(() => {
                minusOne.remove();
            }, 1500);
        }
        
        // 当进度为0时，禁用进一步减少
        if (clickProgress === 0) {
            document.getElementById('expValue').textContent = '0';
        }
    });
    
    // 点击图片时添加动画效果
    circleImage.addEventListener('click', () => {
        circleImage.style.transition = 'transform 0.3s ease';
        circleImage.style.transform = 'scale(1.1)';
        setTimeout(() => {
            circleImage.style.transform = 'scale(1)';
        }, 300);
    });
    
    // 绿色方块图案点击事件
    const pattern2 = document.getElementById('pattern2');
    pattern2.addEventListener('click', () => {
        // 随机搞笑文字数组（不超过25个字）
        const jokes = [
            "你今天打豆豆了吗？",
            "我是来看你笑话的。",
            "别闹了，认真点！",
            "你是不是在逗我？",
            "有本事你再点一次！",
            "别点啦，我快疯了！",
            "你再点我就报警了！",
            "你是不是没朋友？",
            "别点了，求求你了！",
            "你再点我就不理你了！",
            "这下满意了吧？",
            "你是不是闲的？",
            "哈哈哈哈，笑死我了！",
            "你再点我就把你的电脑关了！",
            "别点啦，我好累啊！",
            "你再点我就消失啦！",
            "你再点我就告你骚扰！",
            "你再点我就把你的键盘焊死！",
            "别点啦，我快没电了！",
            "你再点我就把你的显示器砸了！",
            "别点啦，我快爆炸了！",
            "你再点我就把你的鼠标咬碎！"
        ];
        const randomIndex = Math.floor(Math.random() * jokes.length);
        const text = jokes[randomIndex];
        
        // 获取绿色方块图案的位置
        const rect = pattern2.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2 - 40; // 调整 y 坐标
        
        // 创建气泡
        createBubble(text, x, y);
    });
    
    // 获取图案2的图片元素
    const pattern2Img = document.getElementById('pattern2Img');
    
    // 设置图片状态变量
    let isFigure1 = true;
    let isFigure2 = false;
    let isFigure3 = false;
    
    // 鼠标移入事件
    pattern2.addEventListener('mouseover', () => {
        if (isFigure1) {
            pattern2Img.src = 'images/figure_2.png';
            isFigure1 = false;
            isFigure2 = true;
            pattern2Img.classList.add('clicked');
            setTimeout(() => {
                pattern2Img.classList.remove('clicked');
            }, 300);
        }
    });
    
    // 鼠标移出事件
    pattern2.addEventListener('mouseout', () => {
        if (isFigure2 && !isFigure3) {
            pattern2Img.src = 'images/figure_1.gif';
            isFigure1 = true;
            isFigure2 = false;
        }
    });
    
    // 点击事件
    pattern2.addEventListener('click', (e) => {
        if (isFigure2) {
            // 切换到figure_3.png
            pattern2Img.src = 'images/figure_3.png';
            isFigure2 = false;
            isFigure3 = true;
            
            // 短暂停留后恢复为figure_2.png
            setTimeout(() => {
                pattern2Img.src = 'images/figure_2.png';
                pattern2Img.classList.remove('clicked');
                isFigure3 = false;
                isFigure2 = true;
                
                const randomIndex = Math.floor(Math.random() * randomTexts.length);
                const text = randomTexts[randomIndex];
                const rect = pattern2.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top - 20;
                createBubble(text, x, y);
            }, 500);
        }
    });
    
    // 新增代码开始
    const pattern4Img = document.getElementById('pattern4Img');
    
    // 定义状态变量
    let isFigure1Pattern4 = true;
    let isFigure2Pattern4 = false;
    let isFigure3Pattern4 = false;
    
    // 随机气泡文字数组
    const randomTextsPattern4 = [
        "你好，世界！", "欢迎光临", "这是一个测试",
        "点击效果", "随机文字", "网页互动",
        "有趣的功能", "试试其他图案", "继续探索",
        "你真棒！", "再来一次", "发现新功能",
        "精彩继续", "保持好奇心", "探索无限可能"
    ];
    
    // 鼠标移入事件
    pattern4.addEventListener('mouseover', () => {
        if (isFigure1Pattern4) {
            pattern4Img.src = 'images/2_figure_2.png';
            isFigure1Pattern4 = false;
            isFigure2Pattern4 = true;
            pattern4Img.classList.add('clicked');
            setTimeout(() => {
                pattern4Img.classList.remove('clicked');
            }, 300);
        }
    });
    
    // 鼠标移出事件
    pattern4.addEventListener('mouseout', () => {
        if (isFigure2Pattern4 && !isFigure3Pattern4) {
            pattern4Img.src = 'images/2_figure_1.gif';// 修改为.gif
            isFigure1Pattern4 = true;
            isFigure2Pattern4 = false;
        }
    });
    
    // 点击事件
    pattern4.addEventListener('click', (e) => {
        if (isFigure2Pattern4) {
            // 切换到figure_3.png
            pattern4Img.src = 'images/2_figure_3.png';
            isFigure2Pattern4 = false;
            isFigure3Pattern4 = true;
            
            // 添加点击动画
            pattern4Img.classList.add('clicked');
            
            // 随机显示气泡文字
            const randomIndex = Math.floor(Math.random() * randomTextsPattern4.length);
            const text = randomTextsPattern4[randomIndex];
            const rect = pattern4.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top - 20;
            createBubble(text, x, y);
            
            // 短暂停留后恢复为figure_2.png
            setTimeout(() => {
                pattern4Img.src = 'images/2_figure_2.png';
                pattern4Img.classList.remove('clicked');
                isFigure3Pattern4 = false;
                isFigure2Pattern4 = true;
            }, 500);
        }
    });
    
    // 预加载图片
    const img1Pattern4 = new Image();
    img1Pattern4.src = 'images/2_figure_1.gif';
    const img2Pattern4 = new Image();
    img2Pattern4.src = 'images/2_figure_2.png';
    const img3Pattern4 = new Image();
    img3Pattern4.src = 'images/2_figure_3.png';
    
    // 预加载图片 - 修改为预加载.gif文件
    const img1Pattern2 = new Image();
    img1Pattern2.src = 'images/figure_1.gif'; // 修改为.gif
    const img2Pattern2 = new Image();
    img2Pattern2.src = 'images/figure_2.png'; // 修改为.gif
    const img3Pattern2 = new Image();
    img3Pattern2.src = 'images/figure_3.png'; // 修改为.gif
    
    // 新增代码结束
    
    // 为粉色菱形图案（已替换为图片）添加悬停效果
    radioImage.addEventListener('mouseover', () => {
        radioImage.src = 'images/radio_2.png';
    });
    
    radioImage.addEventListener('mouseout', () => {
        radioImage.src = 'images/radio_1.png';
    });
    
    // 预加载radio图片
    const imgRadio1 = new Image();
    imgRadio1.src = 'images/radio_1.png';
    const imgRadio2 = new Image();
    imgRadio2.src = 'images/radio_2.png';
    
    // 为黄色三角形图案（已替换为图片）添加悬停效果
    tvImage.addEventListener('mouseover', () => {
        tvImage.src = 'images/TV_2.png';
    });
    
    tvImage.addEventListener('mouseout', () => {
        tvImage.src = 'images/TV_1.png';
    });
    
    // 预加载TV图片
    const imgTV1 = new Image();
    imgTV1.src = 'images/TV_1.png';
    const imgTV2 = new Image();
    imgTV2.src = 'images/TV_2.png';
});