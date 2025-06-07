document.addEventListener('DOMContentLoaded', function() {
    // 移动导航菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            // 切换图标
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return; // 如果是空的锚点，则不执行任何操作
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去头部高度和一些额外空间
                    behavior: 'smooth'
                });
            }
        });
    });

    // 添加滚动时导航栏阴影效果
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 初始加载时检查滚动位置
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // 标签切换功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 移除所有活动状态
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                // 添加活动状态到当前选中项
                button.classList.add('active');
                const targetTab = button.getAttribute('data-tab');
                const targetPane = document.getElementById(targetTab);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // 添加页面离开提示（只在预防措施页面的下载按钮处）
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            setTimeout(function() {
                alert('下载已开始。请保存此清单并打印存档，以备紧急情况使用。');
            }, 500);
        });
    }

    // 为所有外部链接添加新窗口打开
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // 响应式视频容器
    document.querySelectorAll('iframe').forEach(iframe => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('video-container');
        iframe.parentNode.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
    });

    // 返回顶部按钮
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 添加移动端CSS样式
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                display: none;
                z-index: 100;
            }
            
            nav.active {
                display: block;
            }
            
            nav ul {
                flex-direction: column;
            }
            
            nav ul li {
                margin: 10px 0;
                margin-left: 0;
            }
            
            .mobile-menu {
                display: block;
            }

            .content-grid, .impact-content {
                grid-template-columns: 1fr;
            }

            .timeline::before {
                left: 30px;
            }

            .timeline-item, .timeline-item:nth-child(even) {
                width: 100%;
                padding-left: 70px;
                padding-right: 0;
                justify-content: flex-start;
                margin-left: 0;
            }

            .year, .timeline-item:nth-child(even) .year {
                left: 0;
                right: auto;
            }

            .footer-content {
                grid-template-columns: 1fr;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .button-group {
                flex-direction: column;
            }

            .button-group .btn {
                margin-bottom: 10px;
            }

            .card-container, .causes-container, .community-grid, .response-grid {
                grid-template-columns: 1fr;
            }

            .stat-box {
                grid-template-columns: 1fr;
            }

            .impact-stats {
                grid-template-columns: 1fr 1fr;
            }

            .chart-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

// 获取当前页面文件名
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    return page;
}

// 设置活动导航项
function setActiveNavItem() {
    const currentPage = getCurrentPage();
    const navItems = document.querySelectorAll('nav ul li a');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href').split('/').pop();
        if (itemHref === currentPage) {
            item.classList.add('active');
        } else if (currentPage === '' && itemHref === 'index.html') {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 页面加载时设置活动导航项
window.addEventListener('load', setActiveNavItem); 