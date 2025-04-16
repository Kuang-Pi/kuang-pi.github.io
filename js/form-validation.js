// 表单验证函数
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // 添加提交事件监听器
        contactForm.addEventListener('submit', function(event) {
            // 阻止表单默认提交行为
            event.preventDefault();
            
            // 清除之前的错误信息
            clearErrors();
            
            // 获取表单字段
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // 验证标志
            let isValid = true;
            
            // 验证姓名
            if (!name.value.trim()) {
                showError(name, '请输入您的姓名');
                isValid = false;
            }
            
            // 验证邮箱
            if (!validateEmail(email.value)) {
                showError(email, '请输入有效的电子邮件地址');
                isValid = false;
            }
            
            // 验证主题
            if (!subject.value.trim()) {
                showError(subject, '请输入主题');
                isValid = false;
            }
            
            // 验证消息
            if (!message.value.trim()) {
                showError(message, '请输入您的消息');
                isValid = false;
            }
            
            // 如果全部验证通过
            if (isValid) {
                // 创建成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = '您的消息已成功发送！我会尽快回复您。';
                
                // 在表单之前插入成功消息
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // 重置表单
                contactForm.reset();
                
                // 5秒后移除成功消息
                setTimeout(function() {
                    successMessage.remove();
                }, 5000);
                
                // 这里可以添加表单提交的AJAX代码
                // 例如: sendFormData(formData);
            }
        });
    }
    
    // 邮箱验证函数
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // 显示错误信息函数
    function showError(input, message) {
        // 获取父元素 .form-group
        const formGroup = input.parentElement;
        
        // 创建错误信息元素
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        
        // 添加错误类到输入框
        input.classList.add('input-error');
        
        // 在输入框后添加错误信息
        formGroup.appendChild(error);
    }
    
    // 清除所有错误信息
    function clearErrors() {
        // 移除所有错误信息
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(error) {
            error.remove();
        });
        
        // 移除所有输入框的错误样式
        const inputsWithError = document.querySelectorAll('.input-error');
        inputsWithError.forEach(function(input) {
            input.classList.remove('input-error');
        });
        
        // 移除成功消息
        const successMessages = document.querySelectorAll('.success-message');
        successMessages.forEach(function(message) {
            message.remove();
        });
    }
}); 