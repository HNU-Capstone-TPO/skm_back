from django.shortcuts import render
from .models import User
from django.db.models import Q
from rest_framework import generics
from .serializer import UserSerializer
from django.http.response import HttpResponse
from django.db.models import F
from django.http import JsonResponse  # json형식으로 반환
import os
from neo4j import GraphDatabase
from rest_framework.decorators import api_view
from rest_framework.response import Response
import re

def home1(request):
    return render(request, 'folder/base.html')

gen = ["남성", "여성", "공용", "성별테스트"]
part = ["상의", "하의", "신발", "모자", "아우터", "부위테스트"]
season = ["봄", "여름", "가을", "겨울", "계절테스트"]
brand = ["보세", "뉴발란스", "지프", "나이키", "벨벳", "라코스테", "아디다스", "폴로", "게스"]
price = int
color = ["빨강", "파랑", "주황", "보라", "분홍", "갈색", "노랑", "초록", "하양", "검정", "회색","아이보리","색깔테스트"]
red = ["붉은색", "장미색", "적색", "red", "자주색", "세리스","자주빛", "주홍색", "빨강색", "빨간색", "진홍색", "크림슨", "버건디","다홍색", "스칼렛", "레드벨벳"]
orange = ["주황색", "orange", "오렌지색", "귤색",]
yellow = ["노란색","유황색", "노랑색", "레몬색", "yellow", "샛노란색", "샛노랑색", "개나리색"]
green = ["초록색", "카키색", "연녹색", "풀색", "green", "mint", "민트색", "녹색", "올리브색", "라임색","연두색", "춘록색"]
blue = ["파랑색", "담청색", "파란색", "청색", "연청색","하늘색", "blue", "푸른색", "청록색", "남색", "코발트블루", "군청색", "바다색"]
purple = ["보라색", "purple"]
pink = ["분홍색", "핑크색", "pink"]
white = ["흰색", "하양색", "화이트", "white", "하얀색", "백색"]
black = ["검정색","검색", "까만색", "검은색", "흑색", "고동색", "black"]
brown = ["갈색","황갈색", "탠", "황토색","금색", "누런색", "누렁색", "브라운", "brown", "beige", "베이지", "연한베이지", "연갈색", "다크브라운", "흑갈색"]
ivory = ["아이보리", "ivory", 'cream', '크림색']
gray = ["회색", "짙회색", "연회색", "그레이", "gray", "청회색", "은색"]

def get_value_from_string(string):
    number_regex = r"\d+"
    match = re.search(number_regex, string)
    if match:
        price_string = match.group()
        price = int(price_string.replace(",", ""))
        return price
    return None

def num_conversion(query):
    new_query = []
    for i in range(len(query)):
        string = query[i]
        price = get_value_from_string(string)
        if price is not None:
            new_query.append(price)
        else:
            new_query.append(string)
    return new_query

def color_conversion(query):
    new_query = []
    for q in query:
        if q in red:
            new_query.append(q)
            new_query.append(q.replace(q, "빨강"))
        elif q in orange:
            new_query.append(q)
            new_query.append(q.replace(q, "주황"))
        elif q in yellow:
            new_query.append(q)
            new_query.append(q.replace(q, "노랑"))
        elif q in green:
            new_query.append(q)
            new_query.append(q.replace(q, "초록"))
        elif q in blue:
            new_query.append(q)
            new_query.append(q.replace(q, "파랑"))
        elif q in purple:
            new_query.append(q)
            new_query.append(q.replace(q, "보라"))
        elif q in pink:
            new_query.append(q)
            new_query.append(q.replace(q, "분홍"))
        elif q in brown:
            new_query.append(q)
            new_query.append(q.replace(q, "갈색"))
        elif q in white:
            new_query.append(q)
            new_query.append(q.replace(q, "하양"))
        elif q in black:
            new_query.append(q)
            new_query.append(q.replace(q, "검정"))
        elif q in gray:
            new_query.append(q)
            new_query.append(q.replace(q, "회색"))
        elif q in ivory:
            new_query.append(q)
            new_query.append(q.replace(q, "아이보리"))
        else:
            new_query.append(q)
    return new_query

def createform(request):
    query = request.POST.getlist('query[]')
    query = color_conversion(query)
    query = num_conversion(query)    
    button_value = request.POST.get('button')
    check_season = []
    print(query)

    gdbsearch = 0
    input1 = None
    input2 = None
    input3 = None
    input4 = None
    input5 = None
    input6 = None
    input8 = []  # 태그

    for q in query:
        if q == '남성' or q == '남자':
            input1 = '남성'
        elif q == '여성' or q == '여자':
            input1 = '여성'
        elif q == '공용':
            input1 = '공용'
        elif q in part:
            input2 = q
        elif q in color:
            input3 = q
        elif q in season:
            input4 = q
            check_season.append(input4)
        elif q in brand:
            input5 = q       
        elif isinstance(q, int): 
            print(type(q))
            input6 = q
        else:
            input8.append(q)

    input8 = list(set(input8))

    filters = Q()
    if input1:
        filters &= Q(gender__icontains=input1)
        print("Filter gender:", filters)
    if input2:
        filters &= Q(part__icontains=input2)
    if input3:
        filters &= Q(color__icontains=input3)
    if input4:
        filters &= Q(season__icontains=input4)
    if input5:
        filters &= Q(brand__icontains=input5)
    if input6:
        if input6 < 20000:
            min_price = input6
            max_price = input6 + 10000
        elif 20000 <= input6 and input6 < 100000:
            min_price = input6 - 10000
            max_price = input6 + 10000
        else:
            min_price = input6 - 50000
            max_price = input6 + 50000
        filters &= Q(price__gte=min_price) & Q(price__lte=max_price)        
        #filters &= Q(price__lte=max) & Q(price__gte=min)
    if input8:
        for q in input8:
            users = User.objects.filter(tag__icontains=q)
            users.update(score=F('score') + 1)

        filters |= Q(tag__icontains=input8)

    users = User.objects.filter(filters).order_by('-score')
    serializer = UserSerializer(users, many=True)

    datasearch = serializer.data

    rdb_result = serializer.data[:5] 
    print("ABC:",rdb_result)
    dataexpert_total = []
    datanewbie_total = []
    dataresult_total = []
    for rdb_item in rdb_result:
        if not check_season:
            #compare_season.append(rdb_item['season'])
            compare_season = rdb_item['season']
        else:
            compare_season = check_season
        print("season : ",compare_season)
        gdbsearch = rdb_item['id']  # gdb서치용
        print("aaaaaaa:",gdbsearch)
        gdbsearch_data = User.objects.get(id=gdbsearch)
        gdbsearch_part = gdbsearch_data.part
        users.update(score=0)
        driver = GraphDatabase.driver(
            'neo4j+s://9ff7bd23.databases.neo4j.io', auth=('neo4j', '123456789'))
        session = driver.session()
        q = f"MATCH (a:Node {{name: {gdbsearch}}})-[link:link]-(b:Set) RETURN count(b)"
        setcount = session.run(q).single().get('count(b)')
        print(setcount)
        if setcount == 1: # 아이템이 중복이 아닐 때. 즉, 연결된 set가 하나일 때.
            q = f"""
                MATCH (a:Node {{name: {gdbsearch}}})-[link:link]-(b:Set)
                WITH a, b
                MATCH (b)-[link:link]-(c:Node)
                WITH a, collect(c) AS nodes
                UNWIND nodes AS c
                MATCH (c)-[link:link]-(d:Set)
                WHERE ANY(season IN d.season WHERE season IN {compare_season})
                WITH DISTINCT d AS f, a
                ORDER BY f.view ASC
                LIMIT 1
                SET f.view = f.view + 1
                WITH a,f
                MATCH (f)-[link:link]-(e:Node)
                WHERE e <> a
                RETURN e.name
                """
            a = 1
        else: # 아이템이 중복일 때. 즉, 연결된 set가 여러개일 때.
            q = f"""
                MATCH (a:Node {{name: {gdbsearch}}})-[link:link]-(b:Set)
                WHERE ANY(season IN b.season WHERE season IN {compare_season})
                WITH a, b
                ORDER BY b.view ASC
                LIMIT 1
                SET b.view = b.view + 1
                WITH a, b
                MATCH (b)-[link:link]-(e:Node)
                WHERE e <> a
                RETURN e.name
                """  
            a = 2    
        results = session.run(q)
        result = list(results)
        names = [record['e.name'] for record in result]
        print("A:",a)
        print("vvvv:",names)

        usersnewbie = User.objects.filter(id__in=names)
        serializernewbie = UserSerializer(usersnewbie, many=True)

        users1 = User.objects.filter(id__in=names, part__icontains="상의")[:1]  # 1개 넣은건 newbie용 확인용 나중에 3으로 교체
        users2 = User.objects.filter(id__in=names, part__icontains="하의")[:1]
        users3 = User.objects.filter(id__in=names, part__icontains="신발")[:1]
        users4 = User.objects.filter(id__in=names, part__icontains="모자")[:1]
        users5 = User.objects.filter(id__in=names, part__icontains="아우터")[:1]
        users6 = User.objects.filter(id__in=names, part__icontains="포인트")[:1]
        if gdbsearch_part:
            if gdbsearch_part == "상의":
                users1 = []
            elif gdbsearch_part == "하의":
                users2 = []
            elif gdbsearch_part == "신발":
                users3 = []
            elif gdbsearch_part == "모자":
                users4 = []
            elif gdbsearch_part == "아우터":
                users5 = []
            elif gdbsearch_part == "포인트":
                users6 = []    
        serializer1 = UserSerializer(users1, many=True)
        serializer2 = UserSerializer(users2, many=True)
        serializer3 = UserSerializer(users3, many=True)
        serializer4 = UserSerializer(users4, many=True)
        serializer5 = UserSerializer(users5, many=True)
        serializer6 = UserSerializer(users6, many=True)

        dataresult = serializer1.data + \
            serializer2.data + serializer3.data + serializer4.data + serializer5.data + serializer6.data
        dataresult_total += dataresult
    dataexpert_total = dataresult_total + datasearch
    dataexpert_total = remove_duplicates(dataexpert_total, key=lambda x: x['id'])
    
    part_counts = {'상의': 0, '하의': 0, '신발': 0, '모자': 0, '아우터': 0, '포인트': 0}
    for data in dataresult_total:
        data_part = data['part']
        if part_counts[data_part] < 3:  # 각 부위별로 최대 3개까지 선택
            datanewbie_total.append(data)
            part_counts[data_part] += 1
    datanewbie_total += datasearch
    datanewbie_total = remove_duplicates(datanewbie_total, key=lambda x: x['id'])
    
    if button_value == 'E':   # expert
        return render(request, 'folder/searchreal.html', {'users': dataexpert_total})#dataexpert
    elif button_value == 'S':   # search
        return render(request, 'folder/searchreal.html', {'users': datasearch})#datasearch
    else:       # 아무것도 안누르면 newbie가 기본값
        return render(request, 'folder/searchreal.html', {'users': datanewbie_total})

# 중복 제거를 위한 함수 정의
def remove_duplicates(seq, key=lambda x: x):
    seen = set()
    seen_add = seen.add
    return [x for x in seq if key(x) not in seen and not seen_add(key(x))]


def search_view(request):
    users = User.objects.all()
    return render(request, 'folder/search.html', {'users': UserSerializer(users, many=True)})


class UserListsCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['POST'])
def createform1(request):  # 리액트용
    if request.method == 'POST':
        # data = json.loads(request.body)
        # query = data.get("query")
        query_data = request.POST.getlist('query')
        query_data = color_conversion(query_data)
        query_data = num_conversion(query_data)
        button_value = request.POST.get('button')  
        check_season = [] 
        print(query_data)

        aaa = User.objects.all()
        aaa.update(score=0)

        query1 = []
        for item in query_data:
            query1.extend(item.split(','))

        print(query1)

        gdbsearch = 0
        input1 = None
        input2 = None
        input3 = None
        input4 = None
        input5 = None
        input6 = None
        input8 = []  # 태그

        for q in query1:
            if q == '남성' or q == '남자':
                input1 = '남성'
            elif q == '여성' or q == '여자':
                input1 = '여성'
            elif q == '공용':
                input1 = '공용'
            elif q in part:
                input2 = q
            elif q in color:
                input3 = q
            elif q in season:
                input4 = q
                check_season.append(input4)
            elif q in brand:
                input5 = q
            elif isinstance(q, int): 
                print(type(q))
                input6 = q
            else:
                input8.append(q)

        print(input1, input2, input4, input8)

        input8 = list(set(input8))

        filters = Q()
        if input1:
            filters &= Q(gender__icontains=input1)
        if input2:
            filters &= Q(part__icontains=input2)
        if input3:
            filters &= Q(color__icontains=input3)
        if input4:
            filters &= Q(season__icontains=input4)
        if input5:
            filters &= Q(brand__icontains=input5)
        if input6:
            if input6 < 20000:
                min_price = input6
                max_price = input6 + 10000
            elif 20000 <= input6 and input6 < 100000:
                min_price = input6 - 10000
                max_price = input6 + 10000
            else:
                min_price = input6 - 50000
                max_price = input6 + 50000
            filters &= Q(price__gte=min_price) & Q(price__lte=max_price)        
            #filters &= Q(price__lte=max) & Q(price__gte=min)
        if input8:
            for q in input8:
                users = User.objects.filter(tag__icontains=q)
                users.update(score=F('score') + 1)

            filters |= Q(tag__icontains=input8)
            print(filters)
            print(User.objects.all())

        users = User.objects.filter(filters).order_by('-score')
        print(filters)
        serializer = UserSerializer(users, many=True)

        datasearch  = serializer.data

        rdb_result  = serializer.data[:5] # 결과 몇개까지 볼건데
        dataexpert_total = []
        datanewbie_total = []
        dataresult_total = []
        for rdb_item in rdb_result:
            if not check_season:
                compare_season = rdb_item['season']
            else:
                compare_season = check_season
            print("season : ",compare_season)        
            gdbsearch = rdb_item ['id']  # gdb서치용
            print(gdbsearch)
            # users.update(score=0) #그냥 처음 불러올때 초기화 하는게 나을지도?
            gdbsearch_data = User.objects.get(id=gdbsearch)
            gdbsearch_part = gdbsearch_data.part
            users.update(score=0)
            driver = GraphDatabase.driver(
                'neo4j+s://9ff7bd23.databases.neo4j.io', auth=('neo4j', '123456789'))
            session = driver.session()
            q = f"MATCH (a:Node {{name: {gdbsearch}}})-[link:link]-(b:Set) RETURN count(b)"
            setcount = session.run(q).single().get('count(b)')
            if setcount == 1: # 아이템이 중복이 아닐 때. 즉, 연결된 set가 하나일 때.
                q = f"""
                    MATCH (a:Node {{name: {gdbsearch}}})-[link:link]-(b:Set)
                    WITH a, b
                    MATCH (b)-[link:link]-(c:Node)
                    WITH a, collect(c) AS nodes
                    UNWIND nodes AS c
                    MATCH (c)-[link:link]-(d:Set)
                    WHERE ANY(season IN d.season WHERE season IN {compare_season})
                    WITH DISTINCT d AS f, a
                    ORDER BY f.view ASC
                    LIMIT 1
                    SET f.view = f.view + 1
                    WITH a,f
                    MATCH (f)-[link:link]-(e:Node)
                    WHERE e <> a
                    RETURN e.name
                    """
                a = 1
            else: # 아이템이 중복일 때. 즉, 연결된 set가 여러개일 때.
                q = f"""
                    MATCH (a:Node {{name: {gdbsearch}}})-[link:link]-(b:Set)
                    WHERE ANY(season IN b.season WHERE season IN {compare_season})
                    WITH a, b
                    ORDER BY b.view ASC
                    LIMIT 1
                    SET b.view = b.view + 1
                    WITH a, b
                    MATCH (b)-[link:link]-(e:Node)
                    WHERE e <> a
                    RETURN e.name
                    """  
                a = 2    
            results = session.run(q)
            result = list(results)
            names = [record['e.name'] for record in result]

            users1 = User.objects.filter(id__in=names, part__icontains="상의")[:2]  # 1개 넣은건 newbie용 확인용 나중에 3으로 교체
            users2 = User.objects.filter(id__in=names, part__icontains="하의")[:1]
            users3 = User.objects.filter(id__in=names, part__icontains="신발")[:1]
            users4 = User.objects.filter(id__in=names, part__icontains="모자")[:1]
            users5 = User.objects.filter(id__in=names, part__icontains="아우터")[:1]
            users6 = User.objects.filter(id__in=names, part__icontains="포인트")[:1]
            if gdbsearch_part:
                if gdbsearch_part == "상의":
                    users1 = []
                elif gdbsearch_part == "하의":
                    users2 = []
                elif gdbsearch_part == "신발":
                    users3 = []
                elif gdbsearch_part == "모자":
                    users4 = []
                elif gdbsearch_part == "아우터":
                    users5 = []
                elif gdbsearch_part == "포인트":
                    users6 = []    
            serializer1 = UserSerializer(users1, many=True)
            serializer2 = UserSerializer(users2, many=True)
            serializer3 = UserSerializer(users3, many=True)
            serializer4 = UserSerializer(users4, many=True)
            serializer5 = UserSerializer(users5, many=True)
            serializer6 = UserSerializer(users6, many=True)

            dataresult = serializer1.data + \
                serializer2.data + serializer3.data + serializer4.data + serializer5.data + serializer6.data
            dataresult_total += dataresult
        dataexpert_total = dataresult_total + datasearch
        dataexpert_total = remove_duplicates(dataexpert_total, key=lambda x: x['id'])    

        part_counts = {'상의': 0, '하의': 0, '신발': 0, '모자': 0, '아우터': 0, '포인트': 0}
        for data in dataresult_total:
            data_part = data['part']
            if part_counts[data_part] < 3:  # 각 부위별로 최대 3개까지 선택
                datanewbie_total.append(data)
                part_counts[data_part] += 1
        datanewbie_total += datasearch
        datanewbie_total = remove_duplicates(datanewbie_total, key=lambda x: x['id'])
        
        if button_value == 'E':   # expert
            return JsonResponse({'users': dataexpert_total}, safe=False)
        elif button_value == 'S':   # search
            return JsonResponse({'users': datasearch}, safe=False)
        else:       # 아무것도 안누르면 newbie가 기본값
            return JsonResponse({'users': datanewbie_total}, safe=False)
    else:
        return JsonResponse({'result': 'error', 'message': 'Invalid request method'})

@api_view(['POST'])
def inter(request):  # 리액트용
    if request.method == 'POST':
        interid = request.data.get('userId')
        print(interid)
        
        driver = GraphDatabase.driver(
            'neo4j+s://9ff7bd23.databases.neo4j.io', auth=('neo4j', '123456789'))
        session = driver.session()
        
        q = f"MATCH (a:Node {{name: {interid}}})-[link:link]-(b:Set) RETURN count(b)"
        setcount = session.run(q)
        if setcount == 1: # 아이템이 중복이 아닐 때. 즉, 연결된 set가 하나일 때.
            q = f"""
                MATCH (a:Node {{name: {interid}}})-[link:link]-(b:Set)
                WITH a, b
                MATCH (b)-[link:link]-(c:Node)
                WHERE c <> a
                WITH collect(c) AS nodes
                UNWIND nodes AS c
                MATCH (c)-[link:link]-(d:Set)
                WITH d
                ORDER BY d.view ASC
                LIMIT 1
                SET d.view = d.view + 1
                WITH d
                MATCH (d)-[link:link]-(e:Node)
                RETURN e.name
                """
        else: # 아이템이 중복일 때. 즉, 연결된 set가 여러개일 때.
            q = f"""
                MATCH (a:Node {{name: {interid}}})-[link:link]-(b:Set)
                WITH a, b
                ORDER BY b.view ASC
                LIMIT 1
                SET b.view = b.view + 1
                WITH a, b
                MATCH (b)-[link:link]-(e:Node)
                RETURN e.name
                """  
        results = session.run(q)
        result = list(results)
        
        names = [record.get('e.name') for record in result]
        
        print(names)

        users1 = User.objects.filter(id__in=names, part__icontains="상의")[:1]  # 1개 넣은건 newbie용 확인용 나중에 3으로 교체
        users2 = User.objects.filter(id__in=names, part__icontains="하의")[:1]
        users3 = User.objects.filter(id__in=names, part__icontains="신발")[:1]
        users4 = User.objects.filter(id__in=names, part__icontains="모자")[:1]
        users5 = User.objects.filter(id__in=names, part__icontains="아우터")[:1]
        users6 = User.objects.filter(id__in=names, part__icontains="포인트")[:1]
        serializer1 = UserSerializer(users1, many=True)
        serializer2 = UserSerializer(users2, many=True)
        serializer3 = UserSerializer(users3, many=True)
        serializer4 = UserSerializer(users4, many=True)
        serializer5 = UserSerializer(users5, many=True)
        serializer6 = UserSerializer(users6, many=True)

        recommend = serializer1.data + serializer2.data + \
            serializer3.data + serializer4.data + serializer5.data + serializer6.data

        print("추천추천추천", recommend)

        return JsonResponse({'users': recommend})
    else:
        return JsonResponse({'result': 'error', 'message': 'Invalid request method'})
