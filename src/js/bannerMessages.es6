function BannerMessages (options) {
    this.messages = options.messages;
    this.target = '.' + options.target;
    this.messageClass = 'site-message';
    this.messageTarget = '.' + this.messageClass;

    this.cacheName = 'b_messages';
    this.dataTarget = 'messageid';

    this.getCache = function(key) {
        return JSON.parse(window.localStorage.getItem(key));
    };

    this.setCache = function(key, data) {
        window.localStorage.setItem(key, JSON.stringify(data));
    };

    this.clearCache = function(key) {
        window.localStorage.removeItem(key);
    };

    this.cache = this.getCache(this.cacheName);

    this.updateCache = function(messageArr, cacheArr) {
        if (messageArr.length > 0) {
            if (cacheArr == null) {
                this.setCache(this.cacheName, messageArr.map(function (value) {
                    value.timeCached = new Date().getTime();
                    return value;
                }));
                this.updateMessageDom(messageArr);
                return;
            }

            function updateClosure(self, closureCache) {
                function updateForEach(value) {
                    let cacheFilter = closureCache.filter(function (c) {
                        return c.id === value.id;
                    });

                    if (cacheFilter.length > 0) {
                        let cache = cacheFilter[0];

                        let messageUpdate = new Date(value.timeUpdated);
                        let cacheTime = new Date(cache.timeCached);

                        if (messageUpdate >= cacheTime) {
                            self.updateCacheItem(value);
                            return value;
                        } else {
                            return cache;
                        }
                    }
                }

                return updateForEach;
            }

            let updatedMessages = messageArr.map(updateClosure(this, cacheArr));

            this.setCache(this.cacheName, updatedMessages);
            this.updateMessageDom(updatedMessages);
        } else {
            if (cacheArr != null) {
                this.clearCache(this.cacheName);
            }
        }
    };

    this.updateCacheItem = function(itemToCache) {
        let cacheMessages = this.cache;

        let updatedCacheMessages = cacheMessages.map(function (item) {
            if (item.id === itemToCache.id) {
                return itemToCache;
            }
            return item;
        });

        this.setCache(this.cacheName, updatedCacheMessages);
        this.updateMessageDom(updatedCacheMessages);
    };

    this.updateMessageDom = function (mgs) {

        function mapClosure(self) {

            function mapHtmlGen(item) {
                return '<div class="' + self.messageClass + ' alert alert-'+ item.cssClass +' alert-dismissible fade show" data-'+ self.dataTarget +'="' + item.id +'" role="alert">\n' +
                    '  <div class="container"> \n' +
                    '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
                    '    <span aria-hidden="true">&times;</span>\n' +
                    '  </button>\n' +
                    '  <h4>' + item.title +'</h4> \n' +
                    '  <p>' + item.message + '</p>\n' +
                    '  <a class="btn btn-sm btn-outline-primary" href="' + item.ctaLink + '">' + item.ctaText + '</a>\n' +
                    '  </div>\n' +
                    '</div>';
            }

            return mapHtmlGen;
        }

        let messageEls = mgs.filter(function (item) {
            let now = new Date().getTime();
            return item.active && !item.hidden && Date.parse(item.timeStart) < now  && Date.parse(item.timeEnd) > now;
        }).map(mapClosure(this));

        document.querySelectorAll(this.messageTarget).forEach(n => n.parentNode.removeChild(n));

        let targetNode = document.querySelector(this.target);

        if (messageEls.length > 0) {
            messageEls.forEach(el => targetNode.insertAdjacentHTML('beforeend', el));
            targetNode.classList.remove('hide');

            function closeHandler(self) {

                return function (el) {
                    el.querySelector('.container > button.close').addEventListener('click', {
                        handleEvent: function (e) {
                            let alert = e.target.parentElement.parentElement;
                            let id = parseInt(alert.dataset[self.dataTarget]);
                            self.messages.map(function (v) {
                                if (v.id === id) {
                                    v.hidden = true;
                                    v.timeCached = new Date().getTime();
                                    self.updateCacheItem(v);
                                    return v;
                                }
                                return v;
                            });
                        }
                    }, true);
                }
            }

            Array.prototype.forEach.call(targetNode.childNodes, closeHandler(this));
        } else {
            targetNode.classList.add('hide');
        }

        this.cache = this.getCache(this.cacheName);
    };
    document.addEventListener("DOMContentLoaded", this.updateCache(this.messages, this.cache));
}