loop2 = 0
loop3 = 0
loop4 = 0
loop5 = 0

for i in range(10):
    if(i % 4 == 0):
        loop2 = loop2 + i + loop3 - loop5
    if(i % 3 == 0):
        loop3 = loop3 + ( i + loop2 ) - loop4
    if(i % 2 == 0):
        loop4 = loop4 + ( i + loop2 ) - loop3
    if(i % 1 == 0):
        loop5 = i + loop2 + loop3
    print('i = ' + str(i))
    print('loop2 = ' + str(loop2))
    print('loop3 = ' + str(loop3))
    print('loop4 = ' + str(loop4))
    print('loop5 = ' + str(loop5))
    print(" ")