$(function() {
    addTabs(({ id: '10008', title: '首页', close: false, url: './admin/dashboard.html' }));
    App.fixIframeCotent();
    var menus = [
    //{ id: "10010", text: "我的工作台", isHeader: true },
    { id: '10009', icon: "fa fa-dashboard", targetType: "iframe-tab", url: './admin/dashboard2.html', text: '性能监控' },
    {
        id: "10208",
        text: "系统管理",
        icon: "fa fa-table",
        children: [
        { id: "10213", text: "爬虫管理", targetType: "iframe-tab", url: "./tables/bootstrap-table.html", icon: "fa fa-table" }
        ]
    },
    {
        id: "30209", text: "图表", isOpen: false, icon: "fa fa-pie-chart", children: [
        { id: "30214", text: "chart图表", targetType: "iframe-tab", url: "./charts/chartjs.html", icon: "fa fa-circle-o" },
        { id: "30215", text: "flot图表", targetType: "iframe-tab", url: "./charts/flot.html", icon: "fa fa-circle-o" },
        { id: "30216", text: "inline图表", targetType: "iframe-tab", url: "./charts/inline.html", icon: "fa fa-circle-o" },
        {
            id: "40001",
            text: "echart图表",
            icon: "fa fa-circle-o",
            children: [
            { id: "40002", text: "折线图", targetType: "iframe-tab", url: "./charts/echarts/echarts_line.html", icon: "fa fa-circle-o" },
            { id: "40003", text: "柱状图", targetType: "iframe-tab", url: "./charts/echarts/echarts_column.html", icon: "fa fa-circle-o" },
            { id: "40004", text: "仪表盘", targetType: "iframe-tab", url: "./charts/echarts/echarts_dashboard.html", icon: "fa fa-circle-o" },
            { id: "40005", text: "热力图", targetType: "iframe-tab", url: "./charts/echarts/echarts_hotMap.html", icon: "fa fa-circle-o" },
            { id: "40006", text: "雷达图", targetType: "iframe-tab", url: "./charts/echarts/echarts_radar.html", icon: "fa fa-circle-o" },
            { id: "40007", text: "k线图", targetType: "iframe-tab", url: "./charts/echarts/echarts_kLine.html", icon: "fa fa-circle-o" },
            { id: "40008", text: "地图", targetType: "iframe-tab", url: "./charts/echarts/echarts_map.html", icon: "fa fa-circle-o" }
            ]
        }
        ]
    }
    ];
    $('.sidebar-menu').sidebarMenu({ data: menus, param: { strUser: 'admin' } });
});
