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
import json
from django.http import HttpResponse
import pandas as pd
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
    button_value = request.POST.get('button')

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
        elif q in brand:
            input5 = q
        elif isinstance(q, int): 
            print(type(q))
            input6 = q
            '''min = int(q)-5000
            max = int(q)+5000
            print(q, min, max)'''
            # input6 = q
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
    if not serializer.data:
        return JsonResponse({'users':[]})
    first_result = serializer.data[0]
    gdbsearch = first_result['id']  # gdb서치용

    users.update(score=0)

    driver = GraphDatabase.driver(
        'bolt://localhost:7687', auth=('neo4j', '12345678'))
    session = driver.session()

    q = 'match (n:ID {name:%s})-[w:SET]->(m:ID) return m.name' % (gdbsearch) #여기서 for문돌려서 하나씩뽑자.
    results = session.run(q)
    result = list(results)

    names = [record.get('m.name') for record in result]

    usersnewbie = User.objects.filter(id__in=names)
    serializernewbie = UserSerializer(usersnewbie, many=True)

    dataexpert = datasearch + serializernewbie.data

    users1 = User.objects.filter(id__in=names, part__icontains="상의")[
        :1]  # 1개 넣은건 newbie용 확인용 나중에 3으로 교체
    users2 = User.objects.filter(id__in=names, part__icontains="하의")[:1]
    users3 = User.objects.filter(id__in=names, part__icontains="신발")[:1]
    users4 = User.objects.filter(id__in=names, part__icontains="모자")[:1]

    serializer1 = UserSerializer(users1, many=True)
    serializer2 = UserSerializer(users2, many=True)
    serializer3 = UserSerializer(users3, many=True)
    serializer4 = UserSerializer(users4, many=True)

    datanewbie = datasearch + serializer1.data + \
        serializer2.data + serializer3.data + serializer4.data

    if button_value == 'E':   # expert
        return render(request, 'folder/searchreal.html', {'users': dataexpert})
    elif button_value == 'S':   # search
        return render(request, 'folder/searchreal.html', {'users': datasearch})
    else:       # 아무것도 안누르면 newbie가 기본값
        return render(request, 'folder/searchreal.html', {'users': datanewbie})

    # part_list = ["상의", "하의", "신발", "모자"]
    # for part1 in part_list:
    # users1 = User.objects.filter(id__in=names, part__icontains=part1)[:1]
    # serializer = UserSerializer(users1, many=True)
    # data += serializer.data

    # return JsonResponse({'users': data}) 나중에 json 값으로 바꿔서 프론트에 보내야함
'''
def create_nodes_from_csv(csv_file):
    df = pd.read_csv(csv_file, encoding='ISO-8859-1', header=None) #> 일반 정수값일때.
    #df = pd.read_csv(csv_file, encoding='euc-kr', header=None)
    driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "12345678"))

    with driver.session() as session:
        for row in df.iterrows():
            # 노드가 이미 존재하는지 확인하는 쿼리 실행
            query = "MATCH (n:Node {name: $name}) RETURN n"
            params = {"name": int(row[1].iloc[0])} # params = {"num": int(row[1].iloc[0])} 권장. int일땐. 또는, int로 강제 형변환.
            result = session.run(query, params)
            
            # 노드가 존재하지 않으면 노드 생성 쿼리 실행
            if not result.single():
                query = "CREATE (n:Node {name: $name})"
                params = {"name": int(row[1].iloc[0])}
                session.run(query, params)
    driver.close()
'''
def create_nodes_from_csv(csv_file):
    df = pd.read_csv(csv_file, encoding='ISO-8859-1', header=None) # 헤더를 무시하도록 설정
    driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "12345678"))

    with driver.session() as session:
        for row in df.iterrows():
            name = int(row[1].iloc[0])
            processed = str(row[1].iloc[1])  # 'processed' 값을 문자열로 변환
            
            print(f"Creating node with name: {name}, processed: {processed}")
            
            # 노드가 이미 존재하는지 확인하고, 존재하지 않으면 생성
            query = (
                "MERGE (n:Node {name: $name})"
                " ON CREATE SET n.processed = $processed"
            )
            params = {"name": name, "processed": processed}
            session.run(query, params)
    
    driver.close()
    
def create_set_from_csv(csv_file):
    df = pd.read_csv(csv_file, encoding='ISO-8859-1', header=None) # 헤더를 무시하도록 설정
    driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "12345678"))

    with driver.session() as session:
        for row in df.iterrows():
            set = int(row[1].iloc[0])
            processed = str(row[1].iloc[1])  # 'processed' 값을 문자열로 변환
            
            print(f"Creating Set with name: {set}, processed: {processed}")
            
            # 노드가 이미 존재하는지 확인하고, 존재하지 않으면 생성
            query = (
                "MERGE (n:Set {set: $set})"
                " ON CREATE SET n.processed = $processed"
            )
            params = {"set": set, "processed": processed}
            session.run(query, params)
    
    driver.close()
        
def other(request):

    driver = GraphDatabase.driver(
        'bolt://localhost:7687', auth=('neo4j', '72901997'))
    session = driver.session()

    # gdbsearch.txt 파일에서 gdbsearch 값을 읽어옴
    with open(os.path.join(os.path.dirname(__file__), 'gdbsearch.txt'), 'r') as f:
        gdbsearch = f.read().strip()

    q = 'match (n:ID {name:%s})-[w:SET]->(m:ID) return m.name' % (gdbsearch)
    results = session.run(q)
    result = list(results)

    names = [record.get('m.name') for record in result]
    # print(names)

    users = User.objects.filter(id__in=names)
    serializer = UserSerializer(users, many=True)
    data = serializer.data

    return render(request, 'folder/search2.html', {'users': data})


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
        input6 = 0
        input8 = []  # 태그

        for q in query1:
            if q == '남성' or q == '남자':
                input1 = '남성'
            elif q == '여성' or q == '여자':
                input1 = '여성'
            elif q == '공용':
                input1 = '공용'
            elif q == '성별테스트':
                input1 = '성별테스트'
            # elif q in gen:
                # input1 = q
            elif q in part:
                input2 = q
            elif q in color:
                input3 = q
            elif q in season:
                input4 = q
            elif q in brand:
                input5 = q
            elif q.isdigit():
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
            filters &= Q(price__lte=input6)
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

        data = serializer.data

        first_result = serializer.data[0]
        gdbsearch = first_result['id']  # gdb서치용

        # users.update(score=0) #그냥 처음 불러올때 초기화 하는게 나을지도?

        driver = GraphDatabase.driver(
            'bolt://localhost:7687', auth=('neo4j', '72901997'))
        session = driver.session()

        q = 'match (n:ID {name:%s})-[w:SET]->(m:ID) return m.name' % (gdbsearch)
        results = session.run(q)
        result = list(results)

        names = [record.get('m.name') for record in result]

        users1 = User.objects.filter(id__in=names)
        serializer1 = UserSerializer(users1, many=True)

        data1 = serializer1.data

        dataa = data + data1

        return JsonResponse({'users': dataa})

    else:
        return JsonResponse({'result': 'error', 'message': 'Invalid request method'})
