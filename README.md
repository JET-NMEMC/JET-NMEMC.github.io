# Positive and negative calculation of Gaussian projection coordinate conversion
高斯投影坐标转换正反算

## Example 示例
https://jet-nmemc.github.io/index2.html
This example sets some conversion parameters by default to suit the application in China, and other requirements need to modify the code.
该示例对一些转换参数进行了默认设置，以适合在中国的应用，其他需求需修改代码。

## Usage 方法
Input format:
(1) Geographic coordinates to plane coordinates: latitude first, longitude second, and either comma or space can be separated in the middle; when expressed in degrees, the end ° is not included (such as 37.12345); it supports direct copy and paste of excel;
(2) Plane coordinates to geographic coordinates: X (N) in the front, Y (E) in the back, no matter comma or space in the middle can be separated; support excel to copy and paste directly;
(3) The output result can be directly copied and pasted into excel for use, no need to separate columns.
输入格式：
（1）大地坐标转平面坐标：纬度在前，经度在后,中间无论逗号、空格均可分隔;以度表示时，不含末尾°（如37.12345）;支持excel直接复制粘贴;
（2）平面坐标转大地坐标：X(N)在前，Y(E)在后,中间无论逗号、空格均可分隔;支持excel直接复制粘贴;
（3）输出结果可直接复制并粘贴到excel中使用，无需分列。

## reference 参考
本文的源码参考了以下文章，增加了新的坐标系统并修改了部分参数和计算精度，链接 https://blog.csdn.net/jianyi7659/article/details/7583339.
The source code of this article refers to the following article, link https://blog.csdn.net/jianyi7659/article/details/7583339. New coordinate system has been added, and some parameters and calculation accuracy have been modified.

## Special statement 特别声明
This tool is only for learning and communication, please do not use it for commercial purposes, the author is not responsible for the accuracy of the conversion results, please use it with caution!
本工具仅供学习交流使用，请勿用于商业用途，作者不对转换结果准确性负责，请谨慎使用！
