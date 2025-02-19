const topNav = {
    template: `
        <nav class="fixed top-0 right-0 left-0 h-16 bg-neutral-800 border-b border-neutral-700 px-4">
            <div class="h-full w-full md:w-3/4 xl:w-2/4 mx-auto flex items-center justify-between">
                <div>
                    <a href="" class="text-base md:text-xl font-bold flex items-center space-x-2">
                        <img src="./assets/favicon.png" class="w-5 h-5" />
                        <p>todo <span class="font-light text-base hidden md:inline-block"> &mdash; manage your daily task</span></p>
                    </a>
                </div>
                <slot></slot>
            </div>
        </nav>
    `
}